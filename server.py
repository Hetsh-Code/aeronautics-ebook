"""
Aeronautics E-book — Static Server & Real Email Dispatch API
Serves static assets, handles /api/send-code with live SMTP and /api/save-smtp.
"""

import http.server
import json
import os
import smtplib
import socketserver
import sys
import time
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

PORT = 5173
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
LOG_FILE = os.path.join(BASE_DIR, "dispatched_emails.log")
CONFIG_FILE = os.path.join(BASE_DIR, "smtp_config.json")


def load_smtp_config():
    config = {
        "enabled": False,
        "host": os.environ.get("SMTP_HOST", "smtp.gmail.com"),
        "port": int(os.environ.get("SMTP_PORT", 587)),
        "user": os.environ.get("SMTP_USER", ""),
        "password": os.environ.get("SMTP_PASS", ""),
        "from_email": os.environ.get("SMTP_FROM", ""),
        "sender_name": "Aeronautics E-book Vault"
    }

    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, "r", encoding="utf-8") as f:
                saved = json.load(f)
                config.update(saved)
        except Exception as e:
            sys.stderr.write(f"Error reading {CONFIG_FILE}: {e}\n")

    return config


class FlightSimHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def end_headers(self):
        import urllib.parse
        clean_path = urllib.parse.unquote(self.path.split("?")[0])
        if clean_path.startswith("/installations/"):
            fname = os.path.basename(clean_path)
            self.send_header("Content-Disposition", f'attachment; filename="{fname}"')
        super().end_headers()

    def do_POST(self):
        if self.path == "/api/log-session":
            try:
                content_length = int(self.headers.get("Content-Length", 0))
                post_body = self.rfile.read(content_length)
                data = json.loads(post_body.decode("utf-8"))
                name = data.get("name", "Pilot")
                email = data.get("email", "")

                timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
                log_entry = (
                    f"[{timestamp}] PILOT ACCESS GRANTED\n"
                    f"CALLSIGN: {name}\n"
                    f"EMAIL: {email}\n"
                    f"STATUS: DIRECT ACCESS TO SIMULATOR VAULT (ANDROID & WINDOWS)\n"
                    f"{'-'*60}\n"
                )
                with open(LOG_FILE, "a", encoding="utf-8") as f:
                    f.write(log_entry)

                self._send_json({"success": True, "message": "Session recorded"})
            except Exception as e:
                self._send_json({"success": False, "error": str(e)}, 500)

        elif self.path == "/api/send-code":
            try:
                content_length = int(self.headers.get("Content-Length", 0))
                post_body = self.rfile.read(content_length)
                data = json.loads(post_body.decode("utf-8"))
                name = data.get("name", "Pilot")
                email = data.get("email", "")
                code = data.get("code", "")

                if not email or not code:
                    self._send_json({"success": False, "error": "Email and code required"}, 400)
                    return

                smtp_config = load_smtp_config()
                smtp_sent = False
                smtp_error_msg = None

                # Check if real SMTP is enabled and configured
                if smtp_config.get("enabled") and smtp_config.get("user") and smtp_config.get("password"):
                    host = smtp_config.get("host", "smtp.gmail.com")
                    port = int(smtp_config.get("port", 587))
                    user = smtp_config.get("user")
                    password = smtp_config.get("password")
                    from_email = smtp_config.get("from_email") or user
                    sender_name = smtp_config.get("sender_name", "Aeronautics E-book")

                    email_subject = "Aeronautics E-book — 10-Digit Authorization Key"
                    
                    # HTML and text email body
                    html_content = f"""
                    <!DOCTYPE html>
                    <html>
                    <body style="font-family: Arial, sans-serif; background: #060e1d; color: #ffffff; padding: 30px;">
                      <div style="max-width: 540px; margin: 0 auto; background: #0d1b33; border: 1px solid #00f0ff; border-radius: 12px; padding: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                        <h2 style="color: #00f0ff; margin-top: 0; font-family: monospace; letter-spacing: 2px;">AERONAUTICS E-BOOK</h2>
                        <p style="color: #cbd5e1; font-size: 15px;">Greetings Pilot <strong>{name}</strong>,</p>
                        <p style="color: #94a3b8; font-size: 14px;">Here is your one-time 10-digit cryptographic authorization key to access the simulator vault:</p>
                        <div style="background: #040914; border: 2px dashed #00ff9d; border-radius: 8px; padding: 16px; text-align: center; margin: 24px 0;">
                          <div style="font-family: monospace; font-size: 28px; font-weight: bold; color: #00ff9d; letter-spacing: 4px;">{code}</div>
                        </div>
                        <p style="color: #94a3b8; font-size: 13px;">This code is case-sensitive and includes numbers, letters, and symbols. Enter it directly on your terminal to unlock Android & Windows cracked versions.</p>
                        <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;">
                        <p style="color: #64748b; font-size: 11px;">Aeronautics E-book Vault Dispatch &bull; Automated transmission</p>
                      </div>
                    </body>
                    </html>
                    """

                    try:
                        msg = MIMEMultipart("alternative")
                        msg["From"] = f"{sender_name} <{from_email}>"
                        msg["To"] = email
                        msg["Subject"] = email_subject
                        msg.attach(MIMEText(f"Pilot {name},\n\nYour 10-digit authorization key is: {code}\n", "plain"))
                        msg.attach(MIMEText(html_content, "html"))

                        with smtplib.SMTP(host, port, timeout=12) as server:
                            server.ehlo()
                            server.starttls()
                            server.ehlo()
                            server.login(user, password)
                            server.sendmail(from_email, [email], msg.as_string())
                        smtp_sent = True
                    except Exception as err:
                        smtp_error_msg = str(err)
                        sys.stderr.write(f"Live SMTP Error: {err}\n")

                # Record dispatch to mail log spool
                timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
                status_text = "SENT VIA LIVE SMTP" if smtp_sent else ("FAILED LIVE SMTP: " + str(smtp_error_msg) if smtp_error_msg else "LOCAL SPOOL (SMTP NOT CONFIGURED)")
                log_entry = (
                    f"[{timestamp}] TRANSMISSION TO: {email}\n"
                    f"PILOT: {name}\n"
                    f"SUBJECT: Aeronautics E-book — 10-Digit Authorization Key\n"
                    f"AUTHORIZATION CODE: {code}\n"
                    f"STATUS: {status_text}\n"
                    f"{'-'*60}\n"
                )
                with open(LOG_FILE, "a", encoding="utf-8") as f:
                    f.write(log_entry)

                self._send_json({
                    "success": True,
                    "smtp_sent": smtp_sent,
                    "smtp_error": smtp_error_msg,
                    "recipient": email,
                    "code": code,
                    "message": "Real email dispatched to your inbox!" if smtp_sent else "Authorization key logged to dispatched_emails.log (Live SMTP not configured yet)."
                })
            except Exception as e:
                self._send_json({"success": False, "error": str(e)}, 500)

        elif self.path == "/api/save-smtp":
            try:
                content_length = int(self.headers.get("Content-Length", 0))
                post_body = self.rfile.read(content_length)
                new_config = json.loads(post_body.decode("utf-8"))

                with open(CONFIG_FILE, "w", encoding="utf-8") as f:
                    json.dump(new_config, f, indent=2)

                self._send_json({"success": True, "message": "SMTP configuration saved successfully."})
            except Exception as e:
                self._send_json({"success": False, "error": str(e)}, 500)

        elif self.path == "/api/get-smtp":
            config = load_smtp_config()
            # Hide password for security
            safe_config = dict(config)
            if safe_config.get("password"):
                safe_config["password"] = "********"
            self._send_json(safe_config)

        else:
            self._send_json({"error": "Not Found"}, 404)

    def do_GET(self):
        import urllib.parse
        clean_path = urllib.parse.unquote(self.path.split("?")[0])

        if clean_path == "/api/get-smtp":
            config = load_smtp_config()
            safe_config = dict(config)
            if safe_config.get("password"):
                safe_config["password"] = "********"
            self._send_json(safe_config)
            return

        # Direct Image Link Endpoints for HTML <img> Tag Embedding
        if clean_path == "/api/diagram-image" or clean_path.startswith("/diagrams/"):
            import re
            import urllib.parse
            import diagram_generator

            parsed = urllib.parse.urlparse(self.path)
            params = urllib.parse.parse_qs(parsed.query)

            ch = params.get("chapter", params.get("ch", [None]))[0]
            d = params.get("diagram", params.get("d", [None]))[0]

            if not ch or not d:
                match = re.search(r"AER-(\d+)-D(\d+)", clean_path, re.IGNORECASE)
                if not match:
                    match = re.search(r"ch(?:apter)?[_-]?(\d+)[_-]?(?:diag(?:ram)?|d)?[_-]?(\d+)", clean_path, re.IGNORECASE)
                if match:
                    ch = match.group(1)
                    d = match.group(2)

            ch_num = max(1, min(1000, int(ch or 1)))
            d_num = max(1, min(5, int(d or 1)))

            svg_content = diagram_generator.generate_diagram_svg(ch_num, d_num)
            body = svg_content.encode("utf-8")

            self.send_response(200)
            self.send_header("Content-Type", "image/svg+xml; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "public, max-age=31536000, immutable")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Disposition", f'inline; filename="AER_{ch_num:04d}_D{d_num}.svg"')
            self.end_headers()
            self.wfile.write(body)
            return

        # Check if requested file physically exists on disk
        rel_path = clean_path.lstrip("/").replace("/", os.sep)
        local_path = os.path.join(BASE_DIR, rel_path) if rel_path else os.path.join(BASE_DIR, "index.html")

        if os.path.isfile(local_path):
            super().do_GET()
            return

        # SPA Sublink Routes: /login, /e-book, /ebook, /homepage, /dashboard, /analytics, etc.
        index_file = os.path.join(BASE_DIR, "index.html")
        if os.path.isfile(index_file):
            try:
                with open(index_file, "rb") as f:
                    content = f.read()
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(content)))
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(content)
                return
            except Exception as e:
                pass

        super().do_GET()

    def _send_json(self, data, status=200):
        body = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()


if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), FlightSimHandler) as httpd:
        print(f"Aeronautics E-book server running on http://localhost:{PORT}")
        sys.stdout.flush()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            httpd.shutdown()
