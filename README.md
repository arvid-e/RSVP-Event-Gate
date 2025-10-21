# RSVP Event Gate


## Overview

RSVP Event Gate is a full-stack, real-time application designed to streamline the process of creating, managing, and signing up for small-to-medium-sized events, workshops, and team meetings. The app prioritizes a simple, intuitive user experience while maintaining robust data validation and security protocols.

Our goal is to separate the complexity of event organization from the simple act of attendance.

## Core Features

**Simple Event Creation**: Organizers can quickly set up a new event with minimal overhead.

**Real-Time Validation**: Attendee sign-up forms feature instant, client-side validation using the common-string-validator module to ensure data quality before submission.

**Passcode-Protected Editing**: Attendees are issued a unique passcode upon sign-up, allowing them to securely access and edit their submitted response later.

**Single-Source-of-Truth:** Utilizes MongoDB for data persistence.

## Technology Stack

This project is built as a monolithic application leveraging modern web technologies:

Frontend: React 

Backend: Express (Node.js)

Language: TypeScript

Database: MongoDB

##  Getting Started 

**Clone the Repository:** 

`git clone https://github.com/arvid-e/RSVP-Event-Gate/`

**Install Dependencies:**

`npm install`

**Build frontend**

`cd client`
`npm run build`

**Build backend**

`cd server`
`npm run build`



**Configuration:**

Set up your MongoDB configuration in your environment variables.

`MONGO_URI`

**Run the Application:**

`npm start`


##  License

This project is licensed under the MIT License.

MIT License


Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.