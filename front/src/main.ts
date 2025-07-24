/**
    * @description      : 
    * @author           : renau
    * @group            : 
    * @created          : 23/07/2025 - 12:08:03
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 23/07/2025
    * - Author          : renau
    * - Modification    : 
**/
import { bootstrapApplication } from '@angular/platform-browser'
import { appConfig } from './wttm/wttm.config'
import { Wttm } from './wttm/wttm'

bootstrapApplication(Wttm, appConfig).catch((err) => console.error(err))
