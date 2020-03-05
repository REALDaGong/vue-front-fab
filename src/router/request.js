import {Service} from './service'

export function test () {
  return Service({
    url: '',
    method: 'get'
  })
}

export function login (data) {
  return Service({
    url: 'login',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function register (data) {
  return Service({
    url: 'register',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function searchSIPByStu (data) {
  return Service({
    url: 'sesrchSIPByStu',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function createSubproject (data) {
  return Service({
    url: 'createSubproject',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function deleteSubproject (data) {
  return Service({
    url: 'deleteSubproject',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function joinSubproject (data) {
  return Service({
    url: 'joinSubproject',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function quitSubproject (data) {
  return Service({
    url: 'quitSubproject',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function addComment (data) {
  return Service({
    url: 'addComment',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function queryHistoryOfSubproject (data) {
  return Service({
    url: 'queryHistoryOfSubproject',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function querySubOfPro (data) {
  return Service({
    url: 'querySubOfPro',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function queryAllAppendixForSub (data) {
  return Service({
    url: 'queryAllAppendixForSub',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function uploadAppendixForSub (data) {
  // ?????? get?
}

export function createProject (data) {
  return Service({
    url: 'createProject',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function deleteProject (data) {
  return Service({
    url: 'deleteProject',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function quitProject (data) {
  return Service({
    url: 'quitProject',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function addProMember (data) {
  return Service({
    url: 'AddProMember',
    method: 'post',
    data: JSON.stringify(data)
  })
}

// sesrch?
export function searchProinfo (data) {
  return Service({
    url: 'sesrchProinfo',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function searchStu (data) {
  return Service({
    url: 'searchStu',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function sesrchSIPByproID (data) {
  return Service({
    url: 'sesrchSIPByproID',
    method: 'post',
    data: JSON.stringify(data)
  })
} 

export function score (data) {
  return Service({
    url: 'score',
    method: 'post',
    data: JSON.stringify(data)
  })
} 
export function fixstuinfo (data) {
  return Service({
    url: 'fixstuinfo',
    method: 'post',
    data: JSON.stringify(data)
  })
} 
