import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AdminLayout } from './AdminLayout';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Page } from '../App';
import { User, Mail, Lock, Building2, Palette, FileText, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';

interface AdminSettingsProps {
  navigateTo: (page: Page) => void;
  logout: () => void;
}

export function AdminSettings({ navigateTo, logout }: AdminSettingsProps) {
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@unirooms.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [websiteConfig, setWebsiteConfig] = useState({
    siteName: 'UniRooms',
    tagline: 'Find Your Perfect Student Accommodation',
    contactEmail: 'contact@unirooms.com',
    supportEmail: 'support@unirooms.com',
    phone: '+91 98765 43210',
    address: '123 Campus Road, Education District, Mumbai 400001'
  });

  const [features, setFeatures] = useState({
    allowRegistrations: true,
    requireEmailVerification: true,
    enableReviews: true,
    enableBookings: true,
    maintenanceMode: false
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setWebsiteConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureToggle = (feature: string, value: boolean) => {
    setFeatures(prev => ({ ...prev, [feature]: value }));
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save profile:', profileData);
    // Implement save logic
  };

  const handleWebsiteSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save website config:', websiteConfig);
    // Implement save logic
  };

  return (
    <AdminLayout activePage="admin-settings" navigateTo={navigateTo} logout={logout}>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl mb-2">Settings</h1>
          <p className="text-gray-600">Manage your profile and website configuration</p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="website">Website</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Admin Profile</CardTitle>
                <p className="text-sm text-gray-600">Update your personal information</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSave} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative mt-1">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={profileData.name}
                          onChange={handleProfileChange}
                          className="pl-11"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          className="pl-11"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6 mt-6">
                    <h3 className="mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative mt-1">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            placeholder="Enter current password"
                            value={profileData.currentPassword}
                            onChange={handleProfileChange}
                            className="pl-11"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <div className="relative mt-1">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                              id="newPassword"
                              name="newPassword"
                              type="password"
                              placeholder="Enter new password"
                              value={profileData.newPassword}
                              onChange={handleProfileChange}
                              className="pl-11"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <div className="relative mt-1">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              placeholder="Confirm new password"
                              value={profileData.confirmPassword}
                              onChange={handleProfileChange}
                              className="pl-11"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Website Settings */}
          <TabsContent value="website" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Configuration</CardTitle>
                <p className="text-sm text-gray-600">Customize your website settings</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWebsiteSave} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="siteName">Site Name</Label>
                      <div className="relative mt-1">
                        <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="siteName"
                          name="siteName"
                          type="text"
                          value={websiteConfig.siteName}
                          onChange={handleWebsiteChange}
                          className="pl-11"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="tagline">Tagline</Label>
                      <div className="relative mt-1">
                        <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="tagline"
                          name="tagline"
                          type="text"
                          value={websiteConfig.tagline}
                          onChange={handleWebsiteChange}
                          className="pl-11"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="contactEmail"
                          name="contactEmail"
                          type="email"
                          value={websiteConfig.contactEmail}
                          onChange={handleWebsiteChange}
                          className="pl-11"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="supportEmail">Support Email</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="supportEmail"
                          name="supportEmail"
                          type="email"
                          value={websiteConfig.supportEmail}
                          onChange={handleWebsiteChange}
                          className="pl-11"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={websiteConfig.phone}
                      onChange={handleWebsiteChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={websiteConfig.address}
                      onChange={handleWebsiteChange}
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feature Settings */}
          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Feature Management</CardTitle>
                <p className="text-sm text-gray-600">Enable or disable platform features</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex-1">
                      <h4>Allow New Registrations</h4>
                      <p className="text-sm text-gray-600">Allow new users to register on the platform</p>
                    </div>
                    <Switch
                      checked={features.allowRegistrations}
                      onCheckedChange={(value) => handleFeatureToggle('allowRegistrations', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex-1">
                      <h4>Email Verification</h4>
                      <p className="text-sm text-gray-600">Require email verification for new accounts</p>
                    </div>
                    <Switch
                      checked={features.requireEmailVerification}
                      onCheckedChange={(value) => handleFeatureToggle('requireEmailVerification', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex-1">
                      <h4>Reviews System</h4>
                      <p className="text-sm text-gray-600">Allow students to post reviews and ratings</p>
                    </div>
                    <Switch
                      checked={features.enableReviews}
                      onCheckedChange={(value) => handleFeatureToggle('enableReviews', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex-1">
                      <h4>Booking System</h4>
                      <p className="text-sm text-gray-600">Enable hostel booking functionality</p>
                    </div>
                    <Switch
                      checked={features.enableBookings}
                      onCheckedChange={(value) => handleFeatureToggle('enableBookings', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4>Maintenance Mode</h4>
                      <p className="text-sm text-gray-600">Put the website in maintenance mode (only admins can access)</p>
                    </div>
                    <Switch
                      checked={features.maintenanceMode}
                      onCheckedChange={(value) => handleFeatureToggle('maintenanceMode', value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Features
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="p-6">
                <h4 className="flex items-center gap-2 text-amber-800 mb-2">
                  <span className="text-xl">⚠️</span>
                  Danger Zone
                </h4>
                <p className="text-sm text-amber-700 mb-4">
                  These actions are irreversible. Please be careful.
                </p>
                <div className="space-y-3">
                  <Button variant="destructive" className="w-full sm:w-auto">
                    Clear All Cache
                  </Button>
                  <Button variant="destructive" className="w-full sm:w-auto ml-0 sm:ml-2">
                    Reset All Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
