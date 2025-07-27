from flask import Flask, jsonify
from datetime import datetime
import time

app = Flask(__name__)
start_time = time.time()

@app.route('/')
def home():
    return '''
    <h1>Python API Demo</h1>
    <p>Status: <strong style="color: green;">RUNNING</strong></p>
    <ul>
        <li><a href="/api/status">API Status</a></li>
        <li><a href="/api/users">Users Endpoint</a></li>
        <li><a href="/health">Health Check</a></li>
    </ul>
    '''

@app.route('/api/status')
def api_status():
    uptime = time.time() - start_time
    return jsonify({
        'service': 'python-api',
        'version': '1.0.0',
        'status': 'operational',
        'uptime_seconds': round(uptime, 2),
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/users')
def users():
    return jsonify({
        'users': [
            {'id': 1, 'name': 'Alice', 'role': 'admin'},
            {'id': 2, 'name': 'Bob', 'role': 'user'},
            {'id': 3, 'name': 'Charlie', 'role': 'user'}
        ],
        'total': 3
    })

@app.route('/health')
def health():
    return jsonify({
        'status': 'healthy',
        'checks': {
            'api': 'pass',
            'database': 'pass',
            'memory': 'pass'
        }
    }), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)