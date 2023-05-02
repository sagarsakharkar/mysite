import i18next from 'i18next';
import authRoles from 'src/app/auth/authRoles';
import DocumentationNavigation from '../main/documentation/DocumentationNavigation';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
// import authRoles from '../auth/authRoles';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'myTask',
		title: 'My Task',
		type: 'group',
		icon: 'person',
		url: '/taskboard',
		auth: authRoles.artist,
	},
	{
		id: 'users',
		title: 'Users',
		subtitle: 'Custom made users',
		type: 'group',
		icon: 'heroicons-outline:user',
		// translate: 'USERS',
		children: [
			{
				id: 'users.accounts',
				title: 'Accounts',
				type: 'item',
				icon: 'heroicons-outline:user-circle',
				url: 'users/accounts/all',
			},
			{
				id: 'users.groups',
				title: 'Groups',
				type: 'item',
				icon: 'heroicons-outline:user-group',
				url: '/users/groups',
			},
			{
				id: 'users.permissions',
				title: 'Permissions',
				type: 'item',
				icon: 'security',
				url: '/users/permissions',
			},
		],
	},
	{
		id: 'projects',
		title: 'Project',
		subtitle: 'Custom made projects entities',
		type: 'group',
		icon: 'dashboard',
		// translate: 'PROJECTS',
		auth: authRoles.lead,
		children: [
			{
				id: 'projects.showall',
				title: 'Show All',
				type: 'item',
				icon: 'heroicons-outline:at-symbol',
				url: '/entities/projects'
			},
		]
	},
	{
		id: 'utilities',
		title: 'Utilities',
		subtitle: 'Custom made utilities',
		type: 'group',
		icon: 'apps',
		// translate: 'UTILITIES',
		auth: authRoles.developer,
		children: [
			{
				id: 'utilities.role',
				title: 'Role',
				type: 'item',
				icon: 'heroicons-outline:user-group',
				url: '/utilities/roles'
			},
			{
				id: 'utilities.status',
				title: 'Status',
				type: 'item',
				icon: 'groups',
				url: '/utilities/statuses'
			},
			{
				id: 'utilities.stepAsset',
				title: 'Step Asset',
				type: 'item',
				icon: 'groups',
				url: '/utilities/stepasset'
			},
			{
				id: 'utilities.step',
				title: 'Step',
				type: 'item',
				icon: 'security',
				url: '/utilities/steps',
			},
			{
				id: 'utilities.priority',
				title: 'Priority',
				type: 'item',
				icon: 'school',
				url: '/utilities/priorities'
			},
			{
				id: 'utilities.tool',
				title: 'Tool',
				type: 'item',
				icon: 'school',
				url: '/utilities/tools'
			},
		]
	},
	{
		id: 'tools',
		title: 'Tools',
		subtitle: 'Custom made tools',
		type: 'group',
		icon: 'settings',
		// translate: 'TOOLS',
		auth: authRoles.production,
		children: [
			{
				id: 'tools.email',
				title: 'Email',
				type: 'item',
				icon: 'mail',
				url: '/tools/emails'
			},
			{
				id: 'tools.clientReview',
				title: 'Client Review',
				type: 'item',
				icon: 'groups',
				url: '/tools/review/client'
			},
			{
				id: 'tools.internalReview',
				title: 'Internal Review',
				type: 'item',
				icon: 'groups',
				url: '/tools/review/internal'
			},
		]
	},
	{
		id: 'uploads',
		title: 'Uploads',
		subtitle: 'Custom made uploads',
		type: 'group',
		icon: 'upload',
		// translate: 'UPLOADS',
		auth: authRoles.production,
		children: [
			{
				id: 'ftp',
				title: 'FTP',
				type: 'item',
				icon: 'account_box',
				url: '/uploads/ftp'
			},
		]
	},
	DocumentationNavigation,
];

export default navigationConfig;
