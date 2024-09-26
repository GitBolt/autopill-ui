# Building the AutoPill Automatic Medical Pill Dispenser

## Table of Contents

1. [Introduction](#introduction)
2. [Why Build AutoPill?](#why-build-autopill)
3. [What You’ll Need](#what-youll-need)
4. [Setting Up Your Computer](#setting-up-your-computer)
    - [Installing Python](#installing-python)
    - [Installing Git](#installing-git)
    - [Installing Node.js](#installing-nodejs)
5. [Cloning the Project Files](#cloning-the-project-files)
    - [Frontend Code](#frontend-code)
    - [Backend API Code](#backend-api-code)
6. [Running the Backend Server](#running-the-backend-server)
7. [Setting Up the Hardware](#setting-up-the-hardware)
    - [Components Required](#components-required)
    - [Building the Pill Dispenser Box](#building-the-pill-dispenser-box)
    - [Connecting the Components](#connecting-the-components)
8. [Programming the ESP8266](#programming-the-esp8266)
    - [File: `esp8266/main.py`](#file-esp8266mainpy)
    - [File: `esp8266/boot.py`](#file-esp8266bootpy)
    - [Uploading the Code to ESP8266](#uploading-the-code-to-esp8266)
9. [Running the Frontend Website](#running-the-frontend-website)
10. [Testing Your AutoPill Dispenser](#testing-your-autopill-dispenser)
11. [Understanding the Code](#understanding-the-code)
    - [Backend (`app.py`)](#backend-apppy)
    - [ESP8266 Main Script (`main.py`)](#esp8266-main-script-mainpy)
    - [ESP8266 Boot Script (`boot.py`)](#esp8266-boot-script-bootpy)
12. [Troubleshooting](#troubleshooting)
13. [Conclusion](#conclusion)
14. [References](#references)

## Introduction

**AutoPill** is a smart device that helps people remember to take their medications on time. It consists of a user friendly website where you can set up your medication schedule and a hardware device that dispenses pills and reminds you when it's time to take them. This project combines web development, programming, and hardware setup.

## Why Build AutoPill?

Taking medication on time is crucial for managing health conditions effectively. However, remembering to take pills every day can be challenging, especially for elderly individuals or those with busy schedules. Missed doses can lead to worsening health or ineffective treatment. 

AutoPill is designed to solve this problem by:
- **Reminding Users:** It alerts users when it's time to take their medication through buzzer sounds and LED lights.
- **Dispensing Pills Automatically:** It releases the correct pill at the scheduled time, reducing the chances of forgetting.
- **User-Friendly Interface:** Users can easily set up and manage their medication schedules through a website.

Building AutoPill not only helps others but also teaches you valuable skills in programming, electronics, and problem-solving.

## What You’ll Need

Before we begin, make sure you have the following items:

### Hardware Components
- **ESP8266 Microcontroller:** The brain of the hardware system.
- **Servo Motor:** Moves the container lid to dispense pills.
- **Buzzer:** Makes sound alerts.
- **LED:** Provides visual alerts.
- **Touch Sensor:** Detects user interaction.
- **Jumper Wires:** Connects components on the breadboard.
- **Breadboard:** A platform to build your circuit without soldering.
- **Battery Pack:** Powers your device.
- **Cardboard:** To build the pill dispenser box.
- **Hot Glue Gun (optional):** For assembling parts securely.

### Software Tools
- **Computer (Windows, macOS, or Linux)**
- **Python Installed on Your Computer**
- **Git Installed on Your Computer**
- **Node.js Installed on Your Computer**
- **Text Editor (e.g., VS Code, Notepad++)**
- **USB Cable:** To connect the ESP8266 to your computer.

## Setting Up Your Computer

### Installing Python

Python is a programming language we'll use to run the backend server for AutoPill.

1. **Download Python:**
   - Go to the [Python website](https://www.python.org/downloads/).
   - Click on the "Download Python" button that matches your operating system.

2. **Install Python:**
   - Open the downloaded installer.
   - **Important:** During installation, check the box that says "Add Python to PATH."
   - Click "Install Now" and follow the prompts.

3. **Verify Installation:**
   - Open the Command Prompt (Windows) or Terminal (macOS/Linux).
   - Type `python --version` and press Enter.
   - You should see the Python version number.

### Installing Git

Git is a tool that allows you to download (clone) the project files from GitHub.

1. **Download Git:**
   - Visit the [Git website](https://git-scm.com/downloads).
   - Choose the installer that matches your operating system.

2. **Install Git:**
   - Run the downloaded installer.
   - Follow the installation steps with default settings.

3. **Verify Installation:**
   - Open the Command Prompt or Terminal.
   - Type `git --version` and press Enter.
   - You should see the Git version number.

### Installing Node.js

Node.js is necessary to run the frontend website.

1. **Download Node.js:**
   - Visit the [Node.js website](https://nodejs.org/).
   - Click on the "LTS" (Long Term Support) version to download.

2. **Install Node.js:**
   - Open the downloaded installer.
   - Follow the installation prompts with default settings.

3. **Verify Installation:**
   - Open the Command Prompt or Terminal.
   - Type `node --version` and press Enter.
   - You should see the Node.js version number.

## Cloning the Project Files

We'll download the project files from GitHub repositories.

### Frontend Code

The frontend is the website where you can manage your medication schedule.

1. **Open Command Prompt or Terminal.**
2. **Navigate to Your Desired Folder:**
   ```bash
   cd path/to/your/folder
   ```
3. **Clone the Frontend Repository:**
   ```bash
   git clone https://github.com/GitBolt/autopill-ui.git
   ```

### Backend API Code

The backend handles the data and communication between the website and the hardware.

1. **Open Command Prompt or Terminal.**
2. **Navigate to Your Desired Folder:**
   ```bash
   cd path/to/your/folder
   ```
3. **Clone the Backend Repository:**
   ```bash
   git clone https://github.com/GitBolt/esp8266-flask-api.git
   ```

## Running the Backend Server

The backend server stores your medication data and communicates with the hardware.

1. **Open Command Prompt or Terminal.**
2. **Navigate to the Backend Folder:**
   ```bash
   cd esp8266-flask-api
   ```
3. **Install Dependencies:**
   - Ensure you have a `requirements.txt` file with the following content:
     ```plaintext
     blinker==1.7.0
     click==8.1.7
     dnspython==2.4.2
     Flask==3.0.0
     gunicorn==21.2.0
     itsdangerous==2.1.2
     Jinja2==3.1.2
     MarkupSafe==2.1.3
     packaging==23.2
     pymongo==4.6.1
     python-dateutil==2.8.2
     python-dotenv==1.0.0
     six==1.16.0
     Werkzeug==3.0.1
     ```
   - Install the dependencies by running:
     ```bash
     pip install -r requirements.txt
     ```
4. **Set Up Environment Variables:**
   - Create a file named `.env` in the `esp8266-flask-api` folder.
   - Add your MongoDB connection string:
     ```env
     DB_URL=your_mongodb_connection_string
     ```
   - If you don't have a MongoDB account, you can create one for free at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

5. **Run the Backend Server:**
   ```bash
   python app.py
   ```
   - The server should start and listen on `http://localhost:5000`.

## Logic Flow
![Flow](https://media.discordapp.net/attachments/865444983762452520/1288873965661585553/image.png?ex=66f6c4eb&is=66f5736b&hm=d1be06b0384dd3249d2123f5f9f773f767ae8f7c16d1283cb744ebb3c815ac13&=&width=1986&height=860)

## Setting Up the Hardware

### Components Required

- **ESP8266 Microcontroller:** The brain of the hardware system.
- **Servo Motor:** Moves to dispense pills.
- **Buzzer:** Makes sound alerts.
- **LED:** Provides visual alerts.
- **Touch Sensor:** Detects user interaction.
- **Jumper Wires:** Connects components on the breadboard.
- **Breadboard:** A platform to build your circuit without soldering.
- **Battery Pack:** Powers your device.
- **Cardboard:** To build the pill dispenser box.
- **Hot Glue Gun (optional):** For assembling parts securely.

### Building the Pill Dispenser Box

Building a sturdy and functional pill dispenser box is essential for the device to work correctly.

1. **Gather Materials:**
   - Use sturdy cardboard to create the base and lid of the dispenser.
   - Ensure the cardboard is thick enough to hold the components without bending.

2. **Design the Dispenser:**
   - **Base:** Create a rectangular box that will hold the pills in a cylindrical tube.
   - **Lid Mechanism:** Attach the servo motor to the lid so that it can rotate 90 degrees to open and close.

3. **Assemble the Box:**
   - **Base Construction:**
     - Cut the cardboard to form a rectangle for the base.
     - Make a hole on one side where the servo motor will be attached.
   - **Lid Construction:**
     - Cut another piece of cardboard to serve as the lid.
     - Attach the servo motor to the lid's edge so that it can rotate and open the box when activated.

4. **Attach the Servo Motor:**
   - Secure the servo motor to the designated hole on the base using hot glue or tape.
   - Ensure that the servo's arm is free to move without obstruction.

5. **Create the Pill Release Mechanism:**
   - Inside the base, attach a cylindrical tube where the pills will be stored.
   - Make sure the tube aligns with the servo motor's movement so that when the lid opens, a pill can drop into the dispensing area.

### Connecting the Components

1. **Connect the Servo Motor:**
   - **VCC (Power):** Connect to the 3.3V pin on ESP8266.
   - **GND (Ground):** Connect to the GND pin on ESP8266.
   - **Signal:** Connect to GPIO pin 14.

2. **Connect the Buzzer:**
   - **Positive:** Connect to GPIO pin 4.
   - **Negative:** Connect to GND.

3. **Connect the LED:**
   - **Anode (+):** Connect to GPIO pin 2 through a resistor (e.g., 220Ω).
   - **Cathode (-):** Connect to GND.

4. **Connect the Touch Sensor:**
   - **Output:** Connect to GPIO pin 5.

5. **Power the ESP8266:**
   - Connect the battery pack to the ESP8266's power pins.
   - Ensure correct polarity to prevent damage.

6. **Double-Check Connections:**
   - Verify all connections are secure and correctly placed on the breadboard.
   - Use the diagram below as a reference:

## Programming the ESP8266

We'll upload the code to the ESP8266 microcontroller to control the hardware.

### File: `esp8266/main.py`
```python:esp8266/main.py
import urequests
import utime
from machine import Pin, PWM, Servo
import os
from ntptime import settime

# API URL where the backend server is running
api_url = "http://46.250.226.112:5000/api/medications"

# Initialize hardware components
led = Pin(2, Pin.OUT)
buzzer = PWM(Pin(4))
touch = Pin(5)
servo = Servo(Pin(14))  # Using a Servo library for better control

def boot_signal():
    """Plays a boot-up sound and blinks the LED to indicate the device is ready."""
    start_freq = 400
    end_freq = 1000
    freq_step = 5
    for freq in range(start_freq, end_freq, freq_step):
        buzzer.freq(freq)
        buzzer.duty(512)
        utime.sleep(0.02)
    buzzer.duty(0)
    led.value(1)
    utime.sleep(1)
    led.value(0)

boot_signal()
print(os.listdir())

def ist():
    """Adjusts UTC time to Indian Standard Time (IST)."""
    year, month, mday, hour, minute, second, weekday, yearday = utime.localtime()
    hour += 5
    minute += 30
    if minute >= 60:
        minute -= 60
        hour += 1
    if hour >= 24:
        hour -= 24
        mday += 1
    return utime.localtime(utime.mktime((year, month, mday, hour, minute, second, weekday, yearday)))

def ist_timestamp():
    """Returns the current timestamp in IST."""
    utc_timestamp = utime.time()
    ist_offset = 5 * 3600 + 30 * 60
    ist_timestamp = utc_timestamp + ist_offset
    return ist_timestamp

def fetch_data():
    """Fetches medication schedule data from the backend API."""
    print("Fetching data from API...")
    try:
        response = urequests.get(api_url)
        print("Response received. Status code:", response.status_code)
        if response.status_code == 200:
            return response.json()
        else:
            print("Failed to fetch data. Status code:", response.status_code)
    except Exception as e:
        print("Error during fetching data:", e)
    return None

def blink_led_and_play_sound():
    """Blinks the LED and plays a sound to alert the user."""
    print("Blinking LED and playing sound...")
    log_event("Blinking LED and playing sound")
    end_time = utime.time() + 10
    while utime.time() < end_time:
        led.value(1)
        buzzer.freq(1000)
        buzzer.duty(512)
        utime.sleep(0.1)
        led.value(0)
        buzzer.duty(0)
        utime.sleep(0.1)

def rotate_servo():
    """Rotates the servo motor to dispense a pill."""
    print("Rotating servo to dispense pill...")
    servo.angle(90)  # Rotate to 90 degrees to open the lid
    utime.sleep(2)  # Wait for the pill to drop
    servo.angle(0)  # Return to original position

def update_counter(medication):
    """Updates the medication counter after dispensing a pill."""
    print("Updating counter for medication:", medication['name'])
    medication["counter"] += 1
    response = urequests.put(api_url, json=medication)
    print("Response Status code:", response.status_code)
    if response.status_code == 200:
        updated_medication = response.json()
        print("Res: ", updated_medication)
        return updated_medication
    else:
        print("Failed to update medication. Status code:", response.status_code)
        return None

def parse_time(iso_time_str):
    """Parses ISO formatted time string to a timestamp."""
    year, month, day, hour, minute = map(int, iso_time_str.replace('T', '-').replace(':', '-').split('-')[:5])
    return utime.mktime((year, month, day, hour, minute, 0, 0, 0))

def log_event(event):
    """Logs events to a file for debugging and records."""
    with open("medication_log.txt", "a") as log_file:
        timestamp = ist()
        log_file.write("{}/{}/{} {}:{}:{} - {}\n".format(timestamp[0], timestamp[1], timestamp[2], timestamp[3], timestamp[4], timestamp[5], event))

def main():
    """Main loop that continuously checks for medication schedules and dispenses pills."""
    print("Starting main loop...")
    while True:
        buzzer.freq(2000)
        buzzer.duty(200)
        utime.sleep(0.03)
        buzzer.duty(0)
        data = fetch_data()
        if data is None or len(data) == 0:
            utime.sleep(1)
            continue
        val = touch.value()
        print("Touch Reading: ", val)
        if val == 1:
            update_counter(data[0])
            log_event("Medication counter updated for " + data[0]['name'])
            log_event(f"Next Iteration...Medication Times: {data[0]['times']}")
        if data and len(data) > 0:
            for medication in data:
                current_time = ist_timestamp()
                print("Current time:", current_time)
                for med_time_str in medication["times"]:
                    med_time = parse_time(med_time_str)
                    print("Medication/Current time:", med_time, current_time)
                    if 0 <= (current_time - med_time) <= 10:
                        print("Time match found. Executing actions...")
                        blink_led_and_play_sound()
                        rotate_servo()
        else:
            print("No data found or empty response.")
        print("Waiting for next iteration...\n")
        utime.sleep(1)

if __name__ == "__main__":
    main()
```

### File: `esp8266/boot.py`
```python:esp8266/boot.py
try:
    import usocket as socket
except:
    import socket
from machine import Pin
import network
import gc
import utime

# Replace with your WiFi credentials
ssid = 'your_wifi_ssid'
password = 'your_wifi_password'

# Initialize and connect to WiFi
station = network.WLAN(network.STA_IF)
station.active(True)
station.connect(ssid, password)
print('Connecting to WiFi...')
while not station.isconnected():
    pass
print('Connection successful')
print('IP Address:', station.ifconfig()[0])

import ntptime
ntptime.host = "pool.ntp.org"

def log_event(event):
    """Logs events to a file for debugging and records."""
    with open("medication_log.txt", "a") as log_file:
        log_file.write(event)
        log_file.close()

try:
    print("Local time before synchronization: %s" % str(utime.localtime()))
    log_event(str(utime.localtime()))
    ntptime.settime()
    print("Local time after synchronization: %s" % str(utime.localtime()))
    log_event(str(utime.localtime()) + "\n")
except Exception as e:
    print("Error syncing time:", e)

gc.collect()
```
### Uploading the Code to ESP8266

1. **Connect the ESP8266 to Your Computer:**
   - Use a USB cable to connect the ESP8266 microcontroller to your computer.

2. **Install a Python Tool for ESP8266 (e.g., ampy):**
   - Open Command Prompt or Terminal.
   - Install `ampy` by running:
     ```bash
     pip install adafruit-ampy
     ```

3. **Upload `boot.py` and `main.py` to ESP8266:**
   - Identify the port your ESP8266 is connected to:
     - **Windows:** Look for `COM` port in Device Manager (e.g., `COM3`).
     - **macOS/Linux:** Look for `/dev/ttyUSB0` or similar.
   - Use the following commands to upload the files:
     ```bash
     ampy --port COM3 put esp8266/boot.py
     ampy --port COM3 put esp8266/main.py
     ```
     - Replace `COM3` with your actual port (e.g., `/dev/ttyUSB0`).

4. **Restart the ESP8266:**
   - After uploading, restart the device to run the new scripts.


## Running the Frontend Website

The frontend is the website where you can add and manage your medications.

1. **Open Command Prompt or Terminal.**
2. **Navigate to the Frontend Folder:**
   ```bash
   cd autopill-ui
   ```
3. **Install Dependencies:**
   - Install the necessary packages by running:
     ```bash
     npm install
     ```
4. **Run the Website Locally:**
   ```bash
   npm run dev
   ```
5. **Open the Website:**
   - Open your web browser.
   - Go to [http://localhost:3000](http://localhost:3000).

## Testing Your AutoPill Dispenser

1. **Add Medications:**
   - On the website, add the name of your medication.
   - Set up to five times a day when you need to take the medication.

2. **Start the Backend Server:**
   - Ensure your backend server (`app.py`) is running.

3. **Power the ESP8266:**
   - Make sure the ESP8266 is connected to the battery pack.

4. **Wait for Scheduled Times:**
   - When the current time matches a scheduled medication time, the dispenser will:
     - Rotate the servo motor to release a pill.
     - Sound the buzzer.
     - Blink the LED.

5. **Confirm Dispensing:**
   - Check that the pill is dispensed.
   - Ensure the buzzer sounds and the LED blinks.


## Understanding the Code

Let's break down the important parts of the code to understand how AutoPill works.

### Backend (`app.py`)

The backend server is built using Python Flask. It handles the storage and management of medication schedules.

- **Dependencies:**
  - `Flask`: Web framework to create API endpoints.
  - `pymongo`: To interact with MongoDB for storing data.
  - `dotenv`: To manage environment variables securely.

- **API Endpoints:**
  - `GET /api/medications`: Retrieves the list of medications.
  - `POST /api/medications`: Adds a new medication.
  - `PUT /api/medications`: Updates an existing medication.
  - `DELETE /api/medications`: Deletes a medication.

- **Database:**
  - Uses MongoDB to store medication data securely.

### ESP8266 Main Script (`main.py`)

This script runs on the ESP8266 microcontroller and manages the hardware interactions.

- **Key Functions:**
  - `boot_signal()`: Plays a startup sound and blinks the LED to indicate the device is ready.
  - `fetch_data()`: Retrieves medication schedules from the backend API.
  - `blink_led_and_play_sound()`: Alerts the user through LED and buzzer.
  - `rotate_servo()`: Dispenses a pill by rotating the servo motor.
  - `update_counter()`: Updates the count of dispensed pills.
  - `main()`: The main loop that continuously checks for medication times and triggers actions.

- **Logic Flow:**
  1. **Startup:** Plays a boot signal and logs the start time.
  2. **Main Loop:** 
     - Fetches medication data from the backend.
     - Checks if it's time to dispense a pill.
     - If yes, it alerts the user and dispenses the pill.
     - Updates the medication counter.

### ESP8266 Boot Script (`boot.py`)

This script runs when the ESP8266 starts and sets up the device.

- **Key Functions:**
  - **WiFi Connection:** Connects to the specified WiFi network.
  - **Time Synchronization:** Syncs the device's clock with NTP servers to ensure accurate timing.
  - **Logging:** Records events for debugging purposes.

- **Logic Flow:**
  1. **Connect to WiFi:** Ensures the device is connected to the internet.
  2. **Set Time:** Synchronizes the device's time for accurate scheduling.
  3. **Cleanup:** Frees up memory resources.

---

## Troubleshooting

- **Backend Server Not Running:**
  - Ensure you have installed all dependencies.
  - Check the `.env` file for the correct MongoDB connection string.
  - Restart the server by running `python app.py`.

- **ESP8266 Not Connecting to WiFi:**
  - Double-check the SSID and password in `boot.py`.
  - Ensure your internet connection is active.

- **Website Not Loading:**
  - Make sure the frontend server is running (`npm run dev`).
  - Verify that you’re accessing the correct URL: [http://localhost:3000](http://localhost:3000).

- **Hardware Not Responding:**
  - Check all connections on the breadboard.
  - Ensure the servo motor, buzzer, LED, and touch sensor are connected to the correct GPIO pins.
  - Verify that the servo motor is properly attached to the lid mechanism.

- **Pill Not Dispensing:**
  - Ensure the servo motor is correctly connected and can rotate the lid.
  - Check if the servo motor is receiving the correct signals from the ESP8266.
  - Make sure the pill storage tube is aligned with the dispensing mechanism.

- **LED or Buzzer Not Working:**
  - Verify connections to GPIO pins.
  - Check if the components are functional by testing them individually.


## Conclusion

Congratulations! You've successfully built the AutoPill automatic medical pill dispenser. This project combines web development, programming, and hardware skills, providing a comprehensive learning experience. With AutoPill, you've created a device that can help people manage their medications more effectively. Keep experimenting and enhancing your project to add even more features!


## References

- [AutoPill Frontend Repository](https://github.com/GitBolt/autopill-ui)
- [ESP8266 Flask API Repository](https://github.com/GitBolt/esp8266-flask-api)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Node.js](https://nodejs.org/)
- [Python](https://www.python.org/)
- [Git](https://git-scm.com/)
- [MicroPython for ESP8266](https://micropython.org/download/esp8266/)
- [Servo Motor Guide](https://www.arduino.cc/en/Reference/Servo)
