import request from '@/utils/request'

const api = {
  strategies: '/addons/tradelens/strategy/strategies',
  createAIStrategy: '/addons/tradelens/strategy/aiCreate',
  updateAIStrategy: '/addons/tradelens/strategy/aiUpdate',
  deleteStrategy: '/addons/tradelens/strategy/delete',
  startStrategy: '/addons/tradelens/strategy/start',
  stopStrategy: '/addons/tradelens/strategy/stop',
  testConnection: '/addons/tradelens/strategy/testConnection',
  aiDecisions: '/addons/tradelens/strategy/aiDecisions',
  getCryptoSymbols: '/addons/tradelens/strategy/getCryptoSymbols'
}

/**
 * 获取AI交易策略列表
 */
export function getStrategies () {
  return request({
    url: api.strategies,
    method: 'get'
  })
}

/**
 * 创建AI交易策略
 */
export function createAIStrategy (data) {
  return request({
    url: api.createAIStrategy,
    method: 'post',
    data
  })
}

/**
 * 更新AI交易策略
 */
export function updateAIStrategy (data) {
  return request({
    url: api.updateAIStrategy,
    method: 'post',
    data
  })
}

/**
 * 删除策略
 */
export function deleteStrategy (strategyId) {
  return request({
    url: api.deleteStrategy,
    method: 'delete',
    params: { id: strategyId }
  })
}

/**
 * 启动策略
 */
export function startStrategy (strategyId) {
  return request({
    url: api.startStrategy,
    method: 'post',
    params: { id: strategyId }
  })
}

/**
 * 停止策略
 */
export function stopStrategy (strategyId) {
  return request({
    url: api.stopStrategy,
    method: 'post',
    params: { id: strategyId }
  })
}

/**
 * 测试交易所连接
 */
export function testConnection (data) {
  return request({
    url: api.testConnection,
    method: 'post',
    data
  })
}

/**
 * 获取AI决策记录
 */
export function getAIDecisions (strategyId, params) {
  return request({
    url: api.aiDecisions,
    method: 'get',
    params: {
      strategy_id: strategyId,
      ...params
    }
  })
}

/**
 * 获取系统支持的交易对列表
 */
export function getCryptoSymbols () {
  return request({
    url: api.getCryptoSymbols,
    method: 'get'
  })
}
