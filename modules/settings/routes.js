import AppSettingModule from './app-setting.module';
import Settings from './pages/setting'
import AppSetting from './pages/components/app-settings'


export default [
    // {
    //   path: '/app/settings',
    //   exact: true,
    //   auth: true,
    //   module: AppSettingModule,
    //   component: Settings,
    //     redirect: false

    // },
    {
      path: '/app/settings',
      exact: true,
      auth: true,
      module: AppSettingModule,
      component: AppSetting,
        redirect: false

    },
  ]