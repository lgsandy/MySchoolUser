import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

import store from '../store/index'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Signup.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../components/Main.vue'),
    meta: {
      requiresAuth: true
    },
    children: [{
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../components/Dashboard.vue')
      },
      {
        path: '/masters',
        name: 'Masters',
        component: () => import('../components/Masters/Allmasters.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/dms",
        name: "DMS",
        component: () => import("../components/DMS/mainDMSController.vue")
      },
      {
        path: "/ims",
        name: "IMS",
        component: () => import("../components/IMS/ims_main_controller.vue")
      },
      {
        path: "/hrms",
        name: "HRMS",
        component: () => import("../components/HRMS/hrms_main_controller.vue")
      },
      {
        path: "/vms",
        name: "VMS",
        component: () => import("../components/VMS/vms_main_controller.vue")
      },
      {
        path: '/office_organisatio',
        name: 'OfficeOrginazationMaster',
        component: () => import('../components/Masters/office_orgination/office_orgination.vue')
      },
      {
        path: '/group_master',
        name: 'GroupMaster',
        component: () => import('../components/Masters/group/Group.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/subGroupMaster',
        name: 'SubGroupMaster',
        component: () => import('../components/Masters/sub_group_master/sub_group_master.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/subGroup1Master',
        name: 'SubGroup1Master',
        component: () => import('../components/Masters/sub_group_master/sub_group_master.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/mixDesignMaterialMaster',
        name: 'MixDesignMaterialMaster',
        component: () => import('../components/Masters/mix_design_material_master/mix_design_material_master.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/assets_master',
        name: 'AssetsMaster',
        component: () => import('../components/Masters/Assets/Assetsmaster.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/vendormaster',
        name: 'Vendormaster',
        component: () => import('../components/Masters/vendor_master/vendor_master.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/employeemaster',
        name: 'Employeemaster',
        component: () => import('../components/Masters/employee_master/employee_master.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/material_master',
        name: 'MaterialMaster',
        // component: () => import('../components/Masters/Material/Materialmaster.vue')
      },
      {
        path: '/designationmaster',
        name: 'DesignationMaster',
        component: () => import('../components/Masters/designation/Designation.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/officeMaster',
        name: 'OfficeMaster',
        component: () => import('../components/Masters/office_master/office_master.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/todo',
        name: 'Todo',
        component: () => import('../components/toDo/todo.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/usermaster",
        name: "User Master",
        // component: () =>
        //   import("../components/Masters/User_master/User_master.vue")
      },
      {
        path: "/projectmaster",
        name: "Project Master",
        // component: () =>
        //   import("../components/Masters/Project_master/Project_master.vue")
      },
      {
        path: "/stores_management",
        name: "Store Management",
        component: () =>
          import("../components/StoresManagement/stores_controll_management.vue")
      },
      {
        path: "/purchaseManagement",
        name: "Purchase management",
        component: () =>
          import(
            "../components/StoresManagement/PurchaseManagement/purchaseManagementController.vue"
          )
      },
      {
        path: "/officeMaster",
        name: "OfficeMaster",
        component: () =>
          import("../components/Masters/office_master/office_master.vue")
      },
      {
        path: "/subGroupMaster",
        name: "SubGroupMaster",
        component: () =>
          import("../components/Masters/sub_group_master/sub_group_master.vue")
      },
      {
        path: "/subGroup1Master",
        name: "SubGroup1Master",
        component: () =>
          import(
            "../components/Masters/sub_group1_master/sub_group1_master.vue"
          )
      },
      {
        path: "/mixDesignMaterialMaster",
        name: "MixDesignMaterialMaster",
        component: () =>
          import(
            "../components/Masters/mix_design_material_master/mix_design_material_master.vue"
          )
      },
      {
        path: "/sitemaster",
        name: "Sitemaster",
        // component: () =>
        //   import("../components/Masters/site_master/site_master.vue")
      },
      {
        path: "/plantmaster",
        name: "Plantmaster",
        // component: () =>
        //   import("../components/Masters/plant_master/plant_master.vue")
      },
      {
        path: "/vendorGroupMaster",
        name: "VendorGroupMaster",
        // component: () =>
        //   import( "../components/Masters/vendor_group_master/vendor_group_master.vue")
      },
      {
        path: "/vendorSubGroupMaster",
        name: "VendorSubGroupMaster",
        // component: () =>
        //   import("../components/Masters/vendor_sub_group_master/vendor_sub_group_master.vue")
      },
      {
        path: "/vendorSubGroup1Master",
        name: "VendorSubGroup1Master",
        // component: () =>
        //   import("../components/Masters/vendor_sub_group1_master/vendor_sub_group1_master.vue")
      },
      {
        path: "/bgms",
        name: "Bgms",
        component: () => import("../components/DMS/BGMS/bgmsController.vue")
      },
      {
        path: "/resumeManagement",
        name: "Resume Management",
        component: () =>
          import("../components/DMS/ResumeManagement/resumeManagentControl.vue")
      },
      {
        path: "/referenceLibrary",
        name: "Reference Library",
        component: () =>
          import(
            "../components/DMS/ReferenceLibrary/referenceLibController.vue"
          )
      },
      {
        path: "/multiMediaLibrary",
        name: "Multimedia Library",
        component: () =>
          import(
            "../components/DMS/ReferenceLibrary/referenceLibController.vue"
          )
      },
      {
        path: "/designmanagement",
        name: "Design Managent",
        component: () =>
          import(
            "../components/DMS/DesignsManagement/designManagementController.vue"
          )
      },
      {
        path: "/documentmanagement",
        name: "Doc Management",
        component: () =>
          import(
            "../components/DMS/DocumentsManagement/docManagementController.vue"
          )
      },
      {
        path: "/drawingmanagement",
        name: "Drawing Management",
        component: () =>
          import(
            "../components/DMS/DrawingsManagement/drawingsManagementController.vue"
          )
      },
      {
        path: "/todo",
        name: "Todo",
        component: () => import("../components/toDo/todo.vue")
      },
      {
        path: "/assets_master",
        name: "AssetsMaster",
        component: () => import("../components/Masters/Assets/Assetsmaster.vue")
      },
      {
        path: "/indentMaterial",
        name: "Indent Material",
        component: () => import("../components/StoresManagement/PurchaseManagement/Indent/IndentMaterial.vue")
      },
      {
        path: "/indentApproval",
        name: "Indent Approval",
        component: () => import("../components/StoresManagement/PurchaseManagement/Indent Approval/IndentApproval.vue")
      },
      {
        path: "/quotationsrequest",
        name: "Quotations Request",
        component: () => import("../components/StoresManagement/PurchaseManagement/Quotations Request/QuotationsRequest.vue")
      },

      

    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//check all router for auth
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isLogedIn) {
      next('/');
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (store.getters.isLogedIn) {
      next('/main');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router