"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function CreateUserForm() {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success({
        title: 'User created successfully',
        description: 'The new user has been added to the system and an invitation email has been sent.',
      });
      router.push('/dashboard/users');
    }, 1000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5 text-slate-500" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create New User</h1>
            <p className="text-sm text-slate-500">Add a new user to your institute and assign their role.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
            <CardTitle className="text-lg font-semibold flex items-center text-slate-800">
              <UserPlus className="w-5 h-5 mr-2 text-indigo-500" />
              Personal Information
            </CardTitle>
            <CardDescription>Enter the user's basic details and contact information.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Enter first name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Enter last name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="name@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
              </div>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-medium text-slate-900">Role & Access</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="role">System Role</Label>
                  <Select defaultValue="TEACHER">
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="BRANCH_MANAGER">Branch Manager</SelectItem>
                      <SelectItem value="TEACHER">Teacher</SelectItem>
                      <SelectItem value="STUDENT">Student</SelectItem>
                      <SelectItem value="PARENT">Parent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch">Branch (Optional)</Label>
                  <Select>
                    <SelectTrigger id="branch">
                      <SelectValue placeholder="Select a branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Main Campus</SelectItem>
                      <SelectItem value="north">North Branch</SelectItem>
                      <SelectItem value="south">South Branch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4 mt-6">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Creating...' : 'Create User'}
          </Button>
        </div>
      </form>
    </div>
  );
}
