import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import auth from './auth';
import module from './module';
import enums from './enums';
import permission from './permission';
import branch from './branch';
import user_type from './user_type';
import currency from './currency';
import brand from './brand';
import unit from './unit';
import tag from './tag';
import customer from './customer';
import vendor from './vendor';
import default_currency from './default_currency';
import product_category from './product_category';
import products from './products';
import bank from './bank';
import agency from './agency';
import last_transaction from './last_transaction';
import custom_user_module_permission from './custom_user_module_permission';
import leave_type from './leave_type';
import dealer from './dealer';
import delivery from './delivery';
import transaction_status from './transaction_status';
import expense_category from './expense_category';
import warehouse from './warehouse';
import in_progress from './in_progress';
import supplier from './supplier';
import users from './users';
import position from './position';
import table_size from './default_table_size';
import builder_component from './builder_component';
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
    currency,
    product_category,
    brand,
    unit,
    tag,
    customer,
    vendor,
    default_currency,
    products,
    bank,
    agency,
    last_transaction,
    custom_user_module_permission,
    leave_type,
    dealer,
    delivery,
    transaction_status,
    expense_category,
    warehouse,
    in_progress,
    supplier,
    users,
    position,
    table_size,
    builder_component,
    version,
  },
});

// export const actions = {
//     async initStore({ commit, dispatch }) {
//         const { data } = await axios.post("/system/get_into_vuex", { loading: false })
//     },
// }
