import usersConfigs from './users/usersConfigs';
import utilitiesConfigs from './utilities/utilitiesConfigs';
import entitiesConfigs from './entities/entitiesConfigs';
import toolsConfigs from './tools/toolsConfigs';
import uploadsConfigs from './uploads/uploadsConfigs';

const appsConfigs = [
  ...usersConfigs,
  ...utilitiesConfigs,
  ...entitiesConfigs,
  ...toolsConfigs,
  ...uploadsConfigs,
];

export default appsConfigs;
