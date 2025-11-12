import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

export default function Profile() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
          <p className="text-slate-600 mt-1">Manage your account settings</p>
        </div>
      </div>

      <div className="p-8 max-w-4xl mx-auto">
        <Card>
          <CardContent className="py-20">
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Profile Management</h3>
              <p className="text-slate-600">
                Profile settings coming soon
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
