// Utility functions

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getRiskColor(riskBucket: string): string {
  switch (riskBucket.toLowerCase()) {
    case 'low':
      return 'text-positive';
    case 'medium':
      return 'text-warning';
    case 'high':
      return 'text-danger';
    default:
      return 'text-text-secondary';
  }
}

export function getRiskBgColor(riskBucket: string): string {
  switch (riskBucket.toLowerCase()) {
    case 'low':
      return 'bg-positive/10';
    case 'medium':
      return 'bg-warning/10';
    case 'high':
      return 'bg-danger/10';
    default:
      return 'bg-surface';
  }
}

export function getDecisionColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'text-positive';
    case 'rejected':
      return 'text-danger';
    case 'manual_review':
      return 'text-warning';
    case 'pending':
      return 'text-text-secondary';
    default:
      return 'text-text-secondary';
  }
}

export function getDecisionLabel(status: string): string {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'Approved';
    case 'rejected':
      return 'Rejected';
    case 'manual_review':
      return 'Manual Review';
    case 'pending':
      return 'Pending';
    default:
      return status;
  }
}
