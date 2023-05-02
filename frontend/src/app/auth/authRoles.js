/**
 * Authorization Roles
 */
const authRoles = {
	admin: ['admin'],
	user: ['admin', 'artist', 'production', 'lead', 'developer', 'vendor', 'client', 'cg_supervisor', 'management'],
	artist: ['admin', 'developer', 'artist', 'production', 'supervisor', 'lead', 'cg_supervisor', 'vendor', 'client', 'management'],
	supervisor: ['admin', 'developer', 'production', 'supervisor', 'cg_supervisor'],
	production: ['admin', 'developer', 'production', 'cg_supervisor'],
	lead: ['admin', 'developer', 'production', 'lead', 'cg_supervisor', 'vendor', 'client'],
	developer: ['admin', 'developer'],
	vendor: ['admin', 'developer', 'artist', 'vendor'],
	client: ['admin', 'developer', 'artist', 'client'],
	cg_supervisor: ['admin', 'developer', 'artist', 'cg_supervisor'],
	management: ['admin', 'developer', 'artist', 'management'],
	onlyGuest: []
};

export default authRoles;
