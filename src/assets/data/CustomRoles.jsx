export const AllRoles = {
  purchaseorder: {
    name: 'Purchase Order',
    access: {
      generate: { name: 'Generate', checked: false },
      edit: { name: 'Edit', checked: false },
      approve: { name: 'Approve', checked: false },
      sendToFactory: { name: 'Send To Factory', checked: false },
      delete: { name: 'Delete', checked: false },
    },
  },
  liveinspection: {
    name: 'Live Inspection',
    access: { viewLive: { name: 'View Live', checked: false } },
  },
  inspectionwallet: {
    name: 'Inspection Wallet',
    access: {
      transferCredits: { name: 'Transfer Credits', checked: false },
      viewCredits: { name: 'View Credits', checked: false },
      addCredits: { name: 'Add Credits', checked: false },
    },
  },
  usermanagement: {
    name: 'User Management',
    access: {
      createUser: { name: 'Create/Edit User', checked: false },
      viewUser: { name: 'View User', checked: false },
      deleteUser: { name: 'Delete User', checked: false },
      addBranch: { name: 'Add/Edit Branch', checked: false },
      viewBranch: { name: 'View Branch', checked: false },
    },
  },
  relationshipmanagement: {
    name: 'Relationship Management',
    access: {
      addCompany: { name: 'Add/Edit Company', checked: false },
      viewCompany: { name: 'View Company', checked: false },
      deleteCompany: { name: 'Delete', checked: false },
    },
  },
  reports: {
    name: 'Reports',
    access: {
      viewReports: { name: 'View Reports', checked: false },
    },
  },
};

export const SelectAccess = {
  purchaseOrder: {
    name: 'Purchase Order',
    access: [
      'Request For Change',
      'View',
      'Accept',
      'Generate',
      'Edit',
      'Approve',
      'Send To Factory',
      'Delete',
    ],
  },

  packingList: {
    name: 'Packing List',
    access: ['Create/Edit User', 'Approve', 'Delete', 'Share with OC', 'View'],
  },

  scheduleInspection: {
    name: 'Schedule Inspection',
    access: [
      'View Inspections',
      'Schedule',
      'Reschedule',
      'Approve Reschedule',
      'Approve schedule',
    ],
  },

  liveInspection: {
    name: 'Live Inspection',
    access: ['View Live'],
  },

  inspectionWallet: {
    name: 'Inspection Wallet',
    access: ['Transfer Credits', 'View Credits', 'Add Credits'],
  },

  userManagement: {
    name: 'User Management',
    access: [
      'Create/Edit User',
      'View User',
      'Delete User',
      'Add/Edit Branch',
      'View Branch',
    ],
  },

  relationshipManagement: {
    name: 'Relationship Management',
    access: ['Add/Edit Company', 'View Company', 'Delete'],
  },

  reports: {
    name: 'Reports',
    access: ['View Reports'],
  },

  qaAssignment: {
    name: 'Qa Assignment',
    access: ['Assign/Unassign QC'],
  },
};
