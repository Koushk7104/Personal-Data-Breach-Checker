import React from 'react';
import { Users, Clock, FileText, Pill as Pills } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function DoctorDashboard() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Patients</p>
              <p className="text-2xl font-semibold">248</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Today's Appointments</p>
              <p className="text-2xl font-semibold">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Reports</p>
              <p className="text-2xl font-semibold">5</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Pills className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Prescriptions Today</p>
              <p className="text-2xl font-semibold">8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Requests */}
      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Appointment Requests</h2>
          <div className="space-y-4">
            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500">General Checkup</p>
                  <p className="text-xs text-gray-400 mt-1">Reason: Persistent headache</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Reject</Button>
                  <Button size="sm">Accept</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}