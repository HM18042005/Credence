'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/shared/Card';

export default function BorrowerSettingsPage() {
    return (
        <DashboardLayout
            role="borrower"
            title="Settings"
            subtitle="Manage your profile settings"
        >
            <Card>
                <div className="text-center py-12">
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                        Settings Under Construction
                    </h3>
                    <p className="text-text-secondary">
                        This feature is coming soon.
                    </p>
                </div>
            </Card>
        </DashboardLayout>
    );
}
