declare module '*.vue' {
    import {defineComponent} from 'vue';
    export default defineComponent;
}

declare module 'moment/min/moment-with-locales' {
    import moment from 'moment'
    export = moment
  }
  