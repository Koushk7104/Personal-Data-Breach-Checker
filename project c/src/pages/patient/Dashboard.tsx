import React from 'react';
import { Calendar, VideoIcon, FileText, Pill as Pills, Activity, Clock, Bell } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function PatientDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold">Welcome back, John!</h1>
        <p className="mt-2 text-blue-100">Your next appointment is in 2 days</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Activity className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Blood Pressure</p>
              <p className="text-xl font-semibold">120/80</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <Clock className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Next Checkup</p>
              <p className="text-xl font-semibold">2 Days</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Pills className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Medications</p>
              <p className="text-xl font-semibold">3 Active</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Bell className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Reminders</p>
              <p className="text-xl font-semibold">2 Today</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Medications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Current Medications</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">Amoxicillin</p>
                    <p className="text-sm text-gray-600">500mg - 3 times daily</p>
                    <div className="mt-2 flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      <p className="text-sm text-gray-500">Next dose: 2:00 PM</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Mark as Taken
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">Lisinopril</p>
                    <p className="text-sm text-gray-600">10mg - Once daily</p>
                    <div className="mt-2 flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      <p className="text-sm text-gray-500">Next dose: 8:00 PM</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Mark as Taken
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">Dr. Sarah Johnson</p>
                    <p className="text-sm text-gray-600">General Checkup</p>
                    <div className="mt-2 flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                      <p className="text-sm text-gray-500">Mar 15, 2024 - 10:00 AM</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <Button className="w-full mt-4">
              Book New Appointment
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg h-auto py-4">
          <Calendar className="mr-2 h-5 w-5" />
          Schedule Appointment
        </Button>
        <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg h-auto py-4">
          <VideoIcon className="mr-2 h-5 w-5" />
          Start Consultation
        </Button>
        <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg h-auto py-4">
          <FileText className="mr-2 h-5 w-5" />
          View Medical Records
        </Button>
      </div>
    </div>
  );
}