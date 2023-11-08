import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import auth from './auth';
import module from './module';
import enums from './enums';
import permission from './permission';
import branch from './branch';
import user_type from './user_type';
import custom_user_module_permission from './custom_user_module_permission';
import in_progress from './in_progress';
import users from './users';
import position from './position';
import group from './group';
import table_size from './default_table_size';
import version from './version';

export default new Vuex.Store({
  strict: false,
  modules: {
    auth,
    module,
    enums,
    permission,
    branch,
    user_type,
    custom_user_module_permission,
    in_progress,
    users,
    position,
    group,
    table_size,
    version,
  },
});
