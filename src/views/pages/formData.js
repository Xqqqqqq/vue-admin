export function regroupCascaderData(
	id, //要寻找的唯一值
	data, // 列表总数据
	key = 'value', //列表总数据 的key
	val = 'label', //列表总数据 的value
	list = 'children' //列表总数据 下属关系的key
  ) {
	let _allObj = {}
	const _allArr = []
	const setData = function(data) {
	  let Obj
	  for (const item of data) {
		Obj = {
		  [key]: item[key],
		  [val]: item[val]
		}
		if (item[key] == id) {
		  Obj['isOk'] = true //如果条件符合，接下来就不会再判断
		  return Obj
		} else if (item[list] && item[list].length) {
		  Obj[list] = setData(item[list])
		  if (Obj[list] && Obj[list]['isOk']) {
			Obj['isOk'] = true
			return Obj
		  }
		} else {
		  Obj = null
		}
	  }
	  return Obj
	}
	const getObjData = function(data) {
	  _allArr.push(data[key])
	  if (data[list]) {
		getObjData(data[list])
	  }
	}
	_allObj = setData(data)
	getObjData(_allObj)
	return {
	  Obj: _allObj,
	  arr: _allArr
	}
}