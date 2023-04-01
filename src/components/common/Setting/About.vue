<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue'
import { NSpin } from 'naive-ui'
import { fetchChatConfig } from '@/api'
import pkg from '@/../package.json'
import { useAuthStore } from '@/store'

interface ConfigState {
	timeoutMs?: number
	reverseProxy?: string
	apiModel?: string
	socksProxy?: string
	httpsProxy?: string
	balance?: string
}

const authStore = useAuthStore()

const loading = ref(false)

const config = ref<ConfigState>()

const isChatGPTAPI = computed<boolean>(() => !!authStore.isChatGPTAPI)

async function fetchConfig() {
	try {
		loading.value = true
		const { data } = await fetchChatConfig<ConfigState>()
		config.value = data
	}
	finally {
		loading.value = false
	}
}

onMounted(() => {
	fetchConfig()
})
</script>

<template>
	<NSpin :show="loading">
		<div>
			<h2 class="text-xl font-bold" v-if="isChatGPTAPI">
				{{ $t("setting.balance") }}：{{ config?.balance ?? '-' }}
			</h2>
			<div class="p-2 space-y-2 rounded-md bg-neutral-100 dark:bg-neutral-700">
				<p>此项目为GPT公益项目，每日会为大家免费上新至少10美元余额</p>
				<p>当余额为0时，会自动停止服务。不定时重启服务（每天至少两次）！</p>
				<p>当余额使用完时，欢迎来到<a href="https://ff.huijia.cf" class="text-blue-500" target="_blank" >ff小铺</a>购买个人账户</p>
				<p>个人key大约可用3月-4月，只有你的支持，公益才能继续下去</p>
			</div>

			<p class="p-4 space-y-4">
				Version - {{ pkg.version }}
			</p>
			<!--      <p>{{ $t("setting.api") }}：{{ config?.apiModel ?? '-' }}</p>-->
			<!--      <p v-if="isChatGPTAPI">-->
			<!--        {{ $t("setting.balance") }}：{{ config?.balance ?? '-' }}-->
			<!--      </p>-->
			<!--      <p v-if="!isChatGPTAPI">-->
			<!--        {{ $t("setting.reverseProxy") }}：{{ config?.reverseProxy ?? '-' }}-->
			<!--      </p>-->
			<!--      <p>{{ $t("setting.timeout") }}：{{ config?.timeoutMs ?? '-' }}</p>-->
			<!--      <p>{{ $t("setting.socks") }}：{{ config?.socksProxy ?? '-' }}</p>-->
			<!--      <p>{{ $t("setting.httpsProxy") }}：{{ config?.httpsProxy ?? '-' }}</p>-->
		</div>
	</NSpin>
</template>
