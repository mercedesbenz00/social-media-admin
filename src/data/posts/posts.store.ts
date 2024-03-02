import { defineStore } from "pinia";
import { ePosts } from "./posts.endpoint";
import { useMainStore } from "../main.store";
import { i18n } from "@/plugins/0/i18n.plugin";

export const usePostsStore = defineStore({
  id: 'posts',
  state: () => {
    return {
      reasons: {} as any
    }
  },
  actions: {
    async getReasons(params = {}) {
     try {
      const { data } = await useApi({ ...ePosts.getReasons })
      this.reasons = data
      return data
     } catch (error) {
       useMainStore().toast({ type: 'error', message: i18n('toast.error'), detail: error.response.data.message })
     }
    }
  }
})