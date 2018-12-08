(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}



// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.ad.H === region.al.H)
	{
		return 'on line ' + region.ad.H;
	}
	return 'on lines ' + region.ad.H + ' through ' + region.al.H;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (!x.$)
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800)
			+
			String.fromCharCode(code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




/**_UNUSED/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

var _Json_decodeInt = { $: 2 };
var _Json_decodeBool = { $: 3 };
var _Json_decodeFloat = { $: 4 };
var _Json_decodeValue = { $: 5 };
var _Json_decodeString = { $: 6 };

function _Json_decodeList(decoder) { return { $: 7, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 8, b: decoder }; }

function _Json_decodeNull(value) { return { $: 9, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 10,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 11,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 12,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 13,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 14,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 15,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 3:
			return (typeof value === 'boolean')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a BOOL', value);

		case 2:
			if (typeof value !== 'number') {
				return _Json_expecting('an INT', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return elm$core$Result$Ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return elm$core$Result$Ok(value);
			}

			return _Json_expecting('an INT', value);

		case 4:
			return (typeof value === 'number')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a FLOAT', value);

		case 6:
			return (typeof value === 'string')
				? elm$core$Result$Ok(value)
				: (value instanceof String)
					? elm$core$Result$Ok(value + '')
					: _Json_expecting('a STRING', value);

		case 9:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 5:
			return elm$core$Result$Ok(_Json_wrap(value));

		case 7:
			if (!Array.isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 8:
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 10:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 11:
			var index = decoder.e;
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 12:
			if (typeof value !== 'object' || value === null || Array.isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 13:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 14:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 15:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 3:
		case 2:
		case 4:
		case 6:
		case 5:
			return true;

		case 9:
			return x.c === y.c;

		case 7:
		case 8:
		case 12:
			return _Json_equality(x.b, y.b);

		case 10:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 11:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 13:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 14:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 15:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.a5,
		impl.bh,
		impl.be,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.az) { flags += 'm'; }
	if (options.ai) { flags += 'i'; }

	try
	{
		return elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? elm$core$Maybe$Just(submatch)
				: elm$core$Maybe$Nothing;
		}
		out.push(A4(elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? elm$core$Maybe$Just(submatch)
				: elm$core$Maybe$Nothing;
		}
		return replacer(A4(elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;
var elm$core$Basics$identity = function (x) {
	return x;
};
var elm$core$Task$Perform = elm$core$Basics$identity;
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Basics$EQ = 1;
var elm$core$Basics$LT = 0;
var elm$core$List$cons = _List_cons;
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Basics$GT = 2;
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0;
	return elm$core$Dict$keys(dict);
};
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$core$Task$init = elm$core$Task$succeed(0);
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$core$Basics$False = 1;
var elm$core$Basics$True = 0;
var elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.a) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.c),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.c);
		} else {
			var treeLen = builder.a * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.d) : builder.d;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.a);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.c) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.c);
		}
	});
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{d: nodeList, a: (len / elm$core$Array$branchFactor) | 0, c: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var elm$core$Maybe$Nothing = {$: 1};
var elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 1) {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return 0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0;
		return A2(elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			A2(elm$core$Task$map, toMessage, task));
	});
var author$project$Cmd$Util$perform = function (x) {
	return A2(
		elm$core$Task$perform,
		function (_n0) {
			return x;
		},
		elm$core$Task$succeed(0));
};
var author$project$VerifyExamples$ReadTest = function (a) {
	return {$: 0, a: a};
};
var elm$json$Json$Decode$field = _Json_decodeField;
var elm$json$Json$Decode$list = _Json_decodeList;
var elm$json$Json$Decode$string = _Json_decodeString;
var author$project$VerifyExamples$decoder = A2(
	elm$json$Json$Decode$field,
	'tests',
	elm$json$Json$Decode$list(elm$json$Json$Decode$string));
var author$project$VerifyExamples$reportError = _Platform_outgoingPort('reportError', elm$core$Basics$identity);
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$json$Json$Decode$decodeValue = _Json_run;
var elm$json$Json$Encode$string = _Json_wrap;
var author$project$VerifyExamples$init = function (flags) {
	var _n0 = A2(elm$json$Json$Decode$decodeValue, author$project$VerifyExamples$decoder, flags);
	if (!_n0.$) {
		var tests = _n0.a;
		return elm$core$Platform$Cmd$batch(
			A2(
				elm$core$List$map,
				A2(elm$core$Basics$composeR, author$project$VerifyExamples$ReadTest, author$project$Cmd$Util$perform),
				tests));
	} else {
		var err = _n0.a;
		return author$project$VerifyExamples$reportError(
			elm$json$Json$Encode$string(
				elm$json$Json$Decode$errorToString(err)));
	}
};
var author$project$VerifyExamples$CompileMarkdown = function (a) {
	return {$: 2, a: a};
};
var author$project$VerifyExamples$CompileModule = function (a) {
	return {$: 1, a: a};
};
var author$project$VerifyExamples$DecodingFailed = function (a) {
	return {$: 3, a: a};
};
var author$project$VerifyExamples$ElmSource = F3(
	function (moduleName, fileText, ignoredWarnings) {
		return {G: fileText, av: ignoredWarnings, _: moduleName};
	});
var author$project$VerifyExamples$ModuleName$ModuleName = elm$core$Basics$identity;
var author$project$VerifyExamples$ModuleName$fromString = elm$core$Basics$identity;
var author$project$VerifyExamples$Warning$Ignored$Ignored = F2(
	function (name, ignore) {
		return {Y: ignore, aA: name};
	});
var elm$json$Json$Decode$andThen = _Json_andThen;
var elm$json$Json$Decode$fail = _Json_fail;
var elm$json$Json$Decode$succeed = _Json_succeed;
var author$project$Json$Util$exact = F2(
	function (decoder, x) {
		return A2(
			elm$json$Json$Decode$andThen,
			function (y) {
				return _Utils_eq(x, y) ? elm$json$Json$Decode$succeed(x) : elm$json$Json$Decode$fail('expected ' + (x + (' got ' + y)));
			},
			decoder);
	});
var author$project$VerifyExamples$Warning$Type$ExposingDotDot = 1;
var author$project$VerifyExamples$Warning$Type$NoExampleForExposedDefinition = 0;
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$oneOf = _Json_oneOf;
var author$project$VerifyExamples$Warning$Ignored$warningDecoder = elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			elm$json$Json$Decode$map,
			elm$core$Basics$always(0),
			A2(author$project$Json$Util$exact, elm$json$Json$Decode$string, 'NoExampleForExposedDefinition')),
			A2(
			elm$json$Json$Decode$map,
			elm$core$Basics$always(1),
			A2(author$project$Json$Util$exact, elm$json$Json$Decode$string, 'ExposingDotDot'))
		]));
var elm$json$Json$Decode$map2 = _Json_map2;
var elm$json$Json$Decode$maybe = function (decoder) {
	return elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(elm$json$Json$Decode$map, elm$core$Maybe$Just, decoder),
				elm$json$Json$Decode$succeed(elm$core$Maybe$Nothing)
			]));
};
var author$project$VerifyExamples$Warning$Ignored$ignoredWarnings = A3(
	elm$json$Json$Decode$map2,
	author$project$VerifyExamples$Warning$Ignored$Ignored,
	elm$json$Json$Decode$maybe(
		A2(elm$json$Json$Decode$field, 'name', elm$json$Json$Decode$string)),
	A2(
		elm$json$Json$Decode$field,
		'ignore',
		elm$json$Json$Decode$list(author$project$VerifyExamples$Warning$Ignored$warningDecoder)));
var author$project$VerifyExamples$Warning$Ignored$decode = elm$json$Json$Decode$list(author$project$VerifyExamples$Warning$Ignored$ignoredWarnings);
var elm$json$Json$Decode$map3 = _Json_map3;
var author$project$VerifyExamples$decodeElmSource = A4(
	elm$json$Json$Decode$map3,
	author$project$VerifyExamples$ElmSource,
	A2(
		elm$json$Json$Decode$map,
		author$project$VerifyExamples$ModuleName$fromString,
		A2(elm$json$Json$Decode$field, 'moduleName', elm$json$Json$Decode$string)),
	A2(elm$json$Json$Decode$field, 'fileText', elm$json$Json$Decode$string),
	A2(elm$json$Json$Decode$field, 'ignoredWarnings', author$project$VerifyExamples$Warning$Ignored$decode));
var author$project$VerifyExamples$MarkdownSource = F2(
	function (fileName, fileText) {
		return {ap: fileName, G: fileText};
	});
var author$project$VerifyExamples$decodeMarkdownSource = A3(
	elm$json$Json$Decode$map2,
	author$project$VerifyExamples$MarkdownSource,
	A2(elm$json$Json$Decode$field, 'fileName', elm$json$Json$Decode$string),
	A2(elm$json$Json$Decode$field, 'fileText', elm$json$Json$Decode$string));
var elm$json$Json$Decode$value = _Json_decodeValue;
var author$project$VerifyExamples$generateMarkdownVerifyExamples = _Platform_incomingPort('generateMarkdownVerifyExamples', elm$json$Json$Decode$value);
var author$project$VerifyExamples$generateModuleVerifyExamples = _Platform_incomingPort('generateModuleVerifyExamples', elm$json$Json$Decode$value);
var elm$core$Platform$Sub$batch = _Platform_batch;
var author$project$VerifyExamples$subscriptions = function (_n0) {
	return elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				author$project$VerifyExamples$generateModuleVerifyExamples(
				function (value) {
					var _n1 = A2(elm$json$Json$Decode$decodeValue, author$project$VerifyExamples$decodeElmSource, value);
					if (!_n1.$) {
						var a = _n1.a;
						return author$project$VerifyExamples$CompileModule(a);
					} else {
						var err = _n1.a;
						return author$project$VerifyExamples$DecodingFailed(err);
					}
				}),
				author$project$VerifyExamples$generateMarkdownVerifyExamples(
				function (value) {
					var _n2 = A2(elm$json$Json$Decode$decodeValue, author$project$VerifyExamples$decodeMarkdownSource, value);
					if (!_n2.$) {
						var a = _n2.a;
						return author$project$VerifyExamples$CompileMarkdown(a);
					} else {
						var err = _n2.a;
						return author$project$VerifyExamples$DecodingFailed(err);
					}
				})
			]));
};
var elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2(elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var elm$core$List$repeat = F2(
	function (n, value) {
		return A3(elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var elm$core$String$concat = function (strings) {
	return A2(elm$core$String$join, '', strings);
};
var author$project$String$Util$indent = F2(
	function (count, str) {
		return elm$core$String$concat(
			_Utils_ap(
				A2(elm$core$List$repeat, count * 4, ' '),
				_List_fromArray(
					[str])));
	});
var author$project$String$Util$unlines = elm$core$String$join('\n');
var author$project$VerifyExamples$ModuleName$toString = function (_n0) {
	var name = _n0;
	return name;
};
var author$project$VerifyExamples$Compiler$todoSpec = function (moduleName) {
	return _Utils_Tuple2(
		moduleName,
		author$project$String$Util$unlines(
			_List_fromArray(
				[
					'module VerifyExamples.' + (author$project$VerifyExamples$ModuleName$toString(moduleName) + ' exposing (..)'),
					'',
					'-- This file got generated by [elm-verify-examples](https://github.com/stoeffel/elm-verify-examples).',
					'-- Please don\'t modify this file by hand!',
					'',
					'import Test',
					'import Expect',
					'',
					'',
					'spec : Test.Test',
					'spec =',
					A2(
					author$project$String$Util$indent,
					1,
					'Test.todo \"module ' + (author$project$VerifyExamples$ModuleName$toString(moduleName) + ': No examples to verify yet!\"'))
				])));
};
var author$project$VerifyExamples$Compiler$moduleHeader = F2(
	function (_n0, moduleName) {
		var imports = _n0.R;
		return author$project$String$Util$unlines(
			_List_fromArray(
				[
					'module VerifyExamples.' + (author$project$VerifyExamples$ModuleName$toString(moduleName) + ' exposing (..)'),
					'',
					'-- This file got generated by [elm-verify-examples](https://github.com/stoeffel/elm-verify-examples).',
					'-- Please don\'t modify this file by hand!',
					''
				]));
	});
var elm$core$String$lines = _String_lines;
var author$project$String$Util$indentLines = function (count) {
	return A2(
		elm$core$Basics$composeR,
		elm$core$String$lines,
		A2(
			elm$core$Basics$composeR,
			elm$core$List$map(
				author$project$String$Util$indent(count)),
			author$project$String$Util$unlines));
};
var elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {a4: index, a6: match, a8: number, bd: submatches};
	});
var elm$regex$Regex$replace = _Regex_replaceAtMost(_Regex_infinity);
var author$project$Regex$Util$replaceAllWith = F3(
	function (regex, _with, string) {
		return A3(
			elm$regex$Regex$replace,
			regex,
			elm$core$Basics$always(_with),
			string);
	});
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var elm$regex$Regex$fromString = function (string) {
	return A2(
		elm$regex$Regex$fromStringWith,
		{ai: false, az: false},
		string);
};
var elm$regex$Regex$never = _Regex_never;
var author$project$String$Util$escapedDoubleQuote = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('\\\"'));
var author$project$String$Util$escapedSlashRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('\\\\'));
var author$project$String$Util$escape = A2(
	elm$core$Basics$composeR,
	A2(author$project$Regex$Util$replaceAllWith, author$project$String$Util$escapedSlashRegex, '\\\\'),
	A2(author$project$Regex$Util$replaceAllWith, author$project$String$Util$escapedDoubleQuote, '\\\"'));
var author$project$VerifyExamples$Test$prefixArrow = elm$core$Basics$append('--> ');
var author$project$VerifyExamples$Test$exampleDescription = function (_n0) {
	var assertion = _n0.ah;
	var expectation = _n0.an;
	return author$project$String$Util$unlines(
		_List_fromArray(
			[
				assertion,
				author$project$String$Util$unlines(
				A2(
					elm$core$List$map,
					author$project$VerifyExamples$Test$prefixArrow,
					elm$core$String$lines(expectation)))
			]));
};
var author$project$VerifyExamples$Compiler$testDefinition = F2(
	function (testName, test) {
		return elm$core$String$concat(
			_List_fromArray(
				[
					'Test.test \"',
					testName,
					': \\n\\n',
					A2(
					elm$core$String$join,
					'\\n',
					A2(
						elm$core$List$map,
						A2(
							elm$core$Basics$composeR,
							author$project$String$Util$indent(1),
							author$project$String$Util$escape),
						elm$core$String$lines(
							author$project$VerifyExamples$Test$exampleDescription(test)))),
					'\" <|'
				]));
	});
var author$project$VerifyExamples$Test$specBody = function (_n0) {
	var assertion = _n0.ah;
	var expectation = _n0.an;
	return author$project$String$Util$unlines(
		_List_fromArray(
			['(', assertion, ')', '(', expectation, ')']));
};
var author$project$VerifyExamples$Compiler$spec = F3(
	function (testName, index, test) {
		return author$project$String$Util$unlines(
			_List_fromArray(
				[
					'',
					'',
					'spec' + (elm$core$String$fromInt(index) + ' : Test.Test'),
					'spec' + (elm$core$String$fromInt(index) + ' ='),
					A2(
					author$project$String$Util$indent,
					1,
					A2(author$project$VerifyExamples$Compiler$testDefinition, testName, test)),
					A2(author$project$String$Util$indent, 2, '\\() ->'),
					A2(author$project$String$Util$indent, 3, 'Expect.equal'),
					A2(
					author$project$String$Util$indentLines,
					4,
					author$project$VerifyExamples$Test$specBody(test))
				]));
	});
var author$project$VerifyExamples$Compiler$toImports = function (_n0) {
	var imports = _n0.R;
	return author$project$String$Util$unlines(
		_List_fromArray(
			[
				'import Test',
				'import Expect',
				'',
				author$project$String$Util$unlines(imports),
				''
			]));
};
var author$project$VerifyExamples$Function$toString = function (_n0) {
	var _function = _n0.ar;
	return _function;
};
var author$project$VerifyExamples$Compiler$compileTest = F4(
	function (nomenclature, suite, index, test) {
		var testName = nomenclature.aQ(test);
		var testModuleName = A2(nomenclature.aP, index, test);
		return _Utils_Tuple2(
			testModuleName,
			author$project$String$Util$unlines(
				_List_fromArray(
					[
						A2(author$project$VerifyExamples$Compiler$moduleHeader, suite, testModuleName),
						author$project$VerifyExamples$Compiler$toImports(suite),
						author$project$String$Util$unlines(suite.U),
						'',
						author$project$String$Util$unlines(
						A2(elm$core$List$map, author$project$VerifyExamples$Function$toString, suite.a1)),
						'',
						A3(author$project$VerifyExamples$Compiler$spec, testName, index, test)
					])));
	});
var author$project$VerifyExamples$Compiler$compile = F2(
	function (nomenclature, suite) {
		return A2(
			elm$core$List$indexedMap,
			A2(author$project$VerifyExamples$Compiler$compileTest, nomenclature, suite),
			suite.bf);
	});
var author$project$VerifyExamples$Elm$addSourceImport = F2(
	function (moduleName, testSuite) {
		var sourceImport = 'import ' + (author$project$VerifyExamples$ModuleName$toString(moduleName) + ' exposing (..)');
		return _Utils_update(
			testSuite,
			{
				R: A2(elm$core$List$cons, sourceImport, testSuite.R)
			});
	});
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$String$cons = _String_cons;
var author$project$VerifyExamples$ModuleName$changeCase = F2(
	function (mutator, word) {
		return A2(
			elm$core$Maybe$withDefault,
			'',
			A2(
				elm$core$Maybe$map,
				function (_n0) {
					var head = _n0.a;
					var tail = _n0.b;
					return A2(
						elm$core$String$cons,
						mutator(head),
						tail);
				},
				elm$core$String$uncons(word)));
	});
var elm$core$Char$toUpper = _Char_toUpper;
var author$project$VerifyExamples$ModuleName$toSentenceCase = function (word) {
	return A2(author$project$VerifyExamples$ModuleName$changeCase, elm$core$Char$toUpper, word);
};
var author$project$VerifyExamples$ModuleName$extendName = F2(
	function (_n0, extension) {
		var name = _n0;
		return name + ('.' + author$project$VerifyExamples$ModuleName$toSentenceCase(extension));
	});
var author$project$VerifyExamples$Test$functionName = function (_n0) {
	var functionToTest = _n0.as;
	return functionToTest;
};
var author$project$VerifyExamples$Elm$Nomenclature$testModuleName = F3(
	function (moduleName, index, test) {
		return A2(
			author$project$VerifyExamples$ModuleName$extendName,
			moduleName,
			function () {
				var _n0 = author$project$VerifyExamples$Test$functionName(test);
				if (!_n0.$) {
					var name = _n0.a;
					return _Utils_ap(
						name,
						elm$core$String$fromInt(index));
				} else {
					return 'ModuleDoc' + elm$core$String$fromInt(index);
				}
			}());
	});
var author$project$VerifyExamples$Elm$Nomenclature$testName = function (test) {
	var _n0 = author$project$VerifyExamples$Test$functionName(test);
	if (!_n0.$) {
		var name = _n0.a;
		return '#' + name;
	} else {
		return 'Module VerifyExamples';
	}
};
var author$project$VerifyExamples$Elm$compile = F2(
	function (moduleName, testSuite) {
		return A2(
			author$project$VerifyExamples$Compiler$compile,
			{
				aP: author$project$VerifyExamples$Elm$Nomenclature$testModuleName(moduleName),
				aQ: author$project$VerifyExamples$Elm$Nomenclature$testName
			},
			A2(author$project$VerifyExamples$Elm$addSourceImport, moduleName, testSuite));
	});
var author$project$Maybe$Util$foldrValues = F2(
	function (item, list) {
		if (item.$ === 1) {
			return list;
		} else {
			var v = item.a;
			return A2(elm$core$List$cons, v, list);
		}
	});
var author$project$Maybe$Util$values = A2(elm$core$List$foldr, author$project$Maybe$Util$foldrValues, _List_Nil);
var author$project$Maybe$Util$fromList = function (xs) {
	if (!xs.b) {
		return elm$core$Maybe$Nothing;
	} else {
		return elm$core$Maybe$Just(xs);
	}
};
var author$project$VerifyExamples$Elm$ExposedApi$definitions = function (api) {
	switch (api.$) {
		case 0:
			var defs = api.a;
			return defs;
		case 1:
			return _List_Nil;
		default:
			return _List_Nil;
	}
};
var author$project$VerifyExamples$Elm$ExposedApi$All = {$: 1};
var author$project$VerifyExamples$Elm$ExposedApi$Explicitly = function (a) {
	return {$: 0, a: a};
};
var author$project$VerifyExamples$Elm$ExposedApi$None = {$: 2};
var elm$core$Basics$not = _Basics_not;
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var author$project$VerifyExamples$Elm$ExposedApi$reject = F2(
	function (f, api) {
		switch (api.$) {
			case 0:
				var defs = api.a;
				return author$project$VerifyExamples$Elm$ExposedApi$Explicitly(
					A2(
						elm$core$List$filter,
						function (def) {
							return !f(def);
						},
						defs));
			case 1:
				return author$project$VerifyExamples$Elm$ExposedApi$All;
			default:
				return author$project$VerifyExamples$Elm$ExposedApi$None;
		}
	});
var author$project$VerifyExamples$Warning$Warning = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (!_n0.$) {
			var x = _n0.a;
			return A2(elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var elm$core$Set$Set_elm_builtin = elm$core$Basics$identity;
var elm$core$Set$empty = elm$core$Dict$empty;
var elm$core$Dict$Black = 1;
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$Red = 0;
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1) {
				case 0:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === -1) && (!_n0.a)) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Set$insert = F2(
	function (key, _n0) {
		var dict = _n0;
		return A3(elm$core$Dict$insert, key, 0, dict);
	});
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var elm$core$Dict$member = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$get, key, dict);
		if (!_n0.$) {
			return true;
		} else {
			return false;
		}
	});
var elm$core$Set$member = F2(
	function (key, _n0) {
		var dict = _n0;
		return A2(elm$core$Dict$member, key, dict);
	});
var elm_community$list_extra$List$Extra$uniqueHelp = F4(
	function (f, existing, remaining, accumulator) {
		uniqueHelp:
		while (true) {
			if (!remaining.b) {
				return elm$core$List$reverse(accumulator);
			} else {
				var first = remaining.a;
				var rest = remaining.b;
				var computedFirst = f(first);
				if (A2(elm$core$Set$member, computedFirst, existing)) {
					var $temp$f = f,
						$temp$existing = existing,
						$temp$remaining = rest,
						$temp$accumulator = accumulator;
					f = $temp$f;
					existing = $temp$existing;
					remaining = $temp$remaining;
					accumulator = $temp$accumulator;
					continue uniqueHelp;
				} else {
					var $temp$f = f,
						$temp$existing = A2(elm$core$Set$insert, computedFirst, existing),
						$temp$remaining = rest,
						$temp$accumulator = A2(elm$core$List$cons, first, accumulator);
					f = $temp$f;
					existing = $temp$existing;
					remaining = $temp$remaining;
					accumulator = $temp$accumulator;
					continue uniqueHelp;
				}
			}
		}
	});
var elm_community$list_extra$List$Extra$unique = function (list) {
	return A4(elm_community$list_extra$List$Extra$uniqueHelp, elm$core$Basics$identity, elm$core$Set$empty, list, _List_Nil);
};
var author$project$VerifyExamples$TestSuite$testedFunctions = A2(
	elm$core$Basics$composeR,
	function ($) {
		return $.bf;
	},
	A2(
		elm$core$Basics$composeR,
		elm$core$List$filterMap(author$project$VerifyExamples$Test$functionName),
		elm_community$list_extra$List$Extra$unique));
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var elm$core$List$concatMap = F2(
	function (f, list) {
		return elm$core$List$concat(
			A2(elm$core$List$map, f, list));
	});
var author$project$VerifyExamples$Warning$testedFunctions = function (testSuites) {
	return A2(elm$core$List$concatMap, author$project$VerifyExamples$TestSuite$testedFunctions, testSuites);
};
var elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var author$project$VerifyExamples$Warning$noExamples = F3(
	function (exposedApi, testSuites, ignoredDefinitions) {
		return A2(
			elm$core$Maybe$map,
			author$project$VerifyExamples$Warning$Warning(0),
			author$project$Maybe$Util$fromList(
				author$project$VerifyExamples$Elm$ExposedApi$definitions(
					A2(
						author$project$VerifyExamples$Elm$ExposedApi$reject,
						function (x) {
							return A2(elm$core$List$member, x, ignoredDefinitions);
						},
						A2(
							author$project$VerifyExamples$Elm$ExposedApi$reject,
							function (x) {
								return A2(
									elm$core$List$member,
									x,
									author$project$VerifyExamples$Warning$testedFunctions(testSuites));
							},
							exposedApi)))));
	});
var author$project$VerifyExamples$Elm$ExposedApi$isEverythingExposed = function (api) {
	switch (api.$) {
		case 0:
			return false;
		case 1:
			return true;
		default:
			return false;
	}
};
var author$project$VerifyExamples$Warning$notEverythingExposed = function (exposedApi) {
	return author$project$VerifyExamples$Elm$ExposedApi$isEverythingExposed(exposedApi) ? elm$core$Maybe$Just(
		A2(author$project$VerifyExamples$Warning$Warning, 1, _List_Nil)) : elm$core$Maybe$Nothing;
};
var author$project$VerifyExamples$Warning$Ignored$all = F2(
	function (warning, ignores) {
		var _n0 = A2(
			elm$core$List$filter,
			function (ignored) {
				return _Utils_eq(ignored.aA, elm$core$Maybe$Nothing);
			},
			A2(
				elm$core$List$filter,
				function (_n1) {
					var ignore = _n1.Y;
					return A2(elm$core$List$member, warning, ignore);
				},
				ignores));
		if (!_n0.b) {
			return false;
		} else {
			return true;
		}
	});
var author$project$VerifyExamples$Warning$notIgnoredWarnings = F2(
	function (ignored, _n0) {
		var type_ = _n0.a;
		return !A2(author$project$VerifyExamples$Warning$Ignored$all, type_, ignored);
	});
var author$project$VerifyExamples$Warning$Ignored$subset = F2(
	function (warning, ignores) {
		return A2(
			elm$core$List$filterMap,
			function (ignored) {
				return ignored.aA;
			},
			A2(
				elm$core$List$filter,
				function (_n0) {
					var ignore = _n0.Y;
					return A2(elm$core$List$member, warning, ignore);
				},
				ignores));
	});
var author$project$VerifyExamples$Warning$warnings = F2(
	function (ignored, _n0) {
		var exposedApi = _n0.ao;
		var testSuites = _n0.af;
		return A2(
			elm$core$List$filter,
			author$project$VerifyExamples$Warning$notIgnoredWarnings(ignored),
			author$project$Maybe$Util$values(
				_List_fromArray(
					[
						author$project$VerifyExamples$Warning$notEverythingExposed(exposedApi),
						A3(
						author$project$VerifyExamples$Warning$noExamples,
						exposedApi,
						testSuites,
						A2(author$project$VerifyExamples$Warning$Ignored$subset, 0, ignored))
					])));
	});
var author$project$VerifyExamples$compileElm = F2(
	function (_n0, parsed) {
		var moduleName = _n0._;
		var fileText = _n0.G;
		var ignoredWarnings = _n0.av;
		var _n1 = parsed.af;
		if (!_n1.b) {
			return _Utils_Tuple2(
				_List_Nil,
				_List_fromArray(
					[
						author$project$VerifyExamples$Compiler$todoSpec(moduleName)
					]));
		} else {
			return _Utils_Tuple2(
				A2(author$project$VerifyExamples$Warning$warnings, ignoredWarnings, parsed),
				A2(
					elm$core$List$concatMap,
					author$project$VerifyExamples$Elm$compile(moduleName),
					parsed.af));
		}
	});
var author$project$String$Util$capitalizeFirst = function (str) {
	var _n0 = elm$core$String$uncons(str);
	if (!_n0.$) {
		var _n1 = _n0.a;
		var firstChar = _n1.a;
		var rest = _n1.b;
		return A2(
			elm$core$String$cons,
			elm$core$Char$toUpper(firstChar),
			rest);
	} else {
		return str;
	}
};
var author$project$VerifyExamples$Markdown$testModuleName = F3(
	function (filePath, index, _n0) {
		var filePathComponents = A2(
			elm$core$String$split,
			'/',
			A3(
				elm$regex$Regex$replace,
				A2(
					elm$core$Maybe$withDefault,
					elm$regex$Regex$never,
					elm$regex$Regex$fromString('\\.md$')),
				elm$core$Basics$always(''),
				filePath));
		var addIndex = function (components) {
			return A2(
				elm$core$List$append,
				components,
				_List_fromArray(
					[
						'Test' + elm$core$String$fromInt(index)
					]));
		};
		return author$project$VerifyExamples$ModuleName$fromString(
			A2(
				elm$core$String$join,
				'.',
				A2(
					elm$core$List$cons,
					'MARKDOWN',
					addIndex(
						A2(elm$core$List$map, author$project$String$Util$capitalizeFirst, filePathComponents)))));
	});
var author$project$VerifyExamples$Markdown$compile = F2(
	function (filePath, suite) {
		return A2(
			author$project$VerifyExamples$Compiler$compile,
			{
				aP: author$project$VerifyExamples$Markdown$testModuleName(filePath),
				aQ: function (test) {
					return 'Documentation VerifyExamples';
				}
			},
			suite);
	});
var author$project$VerifyExamples$compileMarkdown = F2(
	function (_n0, parsed) {
		var fileName = _n0.ap;
		return A2(
			elm$core$List$concatMap,
			author$project$VerifyExamples$Markdown$compile(fileName),
			parsed.af);
	});
var author$project$VerifyExamples$writeFiles = _Platform_outgoingPort('writeFiles', elm$core$Basics$identity);
var author$project$VerifyExamples$Encoder$moduleName = function (name) {
	return elm$json$Json$Encode$string(
		author$project$VerifyExamples$ModuleName$toString(name));
};
var elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, obj) {
					var k = _n0.a;
					var v = _n0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var author$project$VerifyExamples$Encoder$encodeFile = function (_n0) {
	var name = _n0.a;
	var content = _n0.b;
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'moduleName',
				author$project$VerifyExamples$Encoder$moduleName(name)),
				_Utils_Tuple2(
				'content',
				elm$json$Json$Encode$string(content))
			]));
};
var elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var author$project$VerifyExamples$Encoder$files = function (modules) {
	return A2(elm$json$Json$Encode$list, author$project$VerifyExamples$Encoder$encodeFile, modules);
};
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var author$project$VerifyExamples$generateTests = function (tests) {
	if (!tests.b) {
		return elm$core$Platform$Cmd$none;
	} else {
		return author$project$VerifyExamples$writeFiles(
			author$project$VerifyExamples$Encoder$files(tests));
	}
};
var author$project$VerifyExamples$readFile = _Platform_outgoingPort('readFile', elm$json$Json$Encode$string);
var author$project$VerifyExamples$warn = _Platform_outgoingPort('warn', elm$core$Basics$identity);
var author$project$VerifyExamples$Warning$toString = function (_n0) {
	var type_ = _n0.a;
	var definitions = _n0.b;
	if (!type_) {
		return author$project$String$Util$unlines(
			A2(
				elm$core$List$cons,
				'The following exposed definitions don\'t have examples:\n',
				A2(
					elm$core$List$map,
					elm$core$Basics$append('    - '),
					definitions)));
	} else {
		return author$project$String$Util$unlines(
			_List_fromArray(
				['It\'s recommended to be specific about your exports.', '', '    Don\'t use `module ... exposing (..)`', '                                    ^^  ']));
	}
};
var author$project$VerifyExamples$Encoder$encodeWarning = function (warning) {
	return elm$json$Json$Encode$string(
		author$project$VerifyExamples$Warning$toString(warning));
};
var author$project$VerifyExamples$Encoder$warnings = F2(
	function (name, warns) {
		return elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'moduleName',
					author$project$VerifyExamples$Encoder$moduleName(name)),
					_Utils_Tuple2(
					'warnings',
					A2(elm$json$Json$Encode$list, author$project$VerifyExamples$Encoder$encodeWarning, warns))
				]));
	});
var author$project$VerifyExamples$reportWarnings = F2(
	function (moduleName, warnings) {
		return author$project$VerifyExamples$warn(
			A2(author$project$VerifyExamples$Encoder$warnings, moduleName, warnings));
	});
var author$project$VerifyExamples$Ast$Grouped$empty = {P: _List_Nil, Q: _List_Nil, R: _List_Nil, U: _List_Nil};
var author$project$VerifyExamples$Ast$Grouped$Function = elm$core$Basics$identity;
var author$project$VerifyExamples$Ast$Grouped$Import = elm$core$Basics$identity;
var author$project$VerifyExamples$Ast$Grouped$Type = elm$core$Basics$identity;
var author$project$VerifyExamples$Ast$Grouped$setExamples = F2(
	function (examples, groupped) {
		return _Utils_update(
			groupped,
			{P: examples});
	});
var author$project$VerifyExamples$Ast$Grouped$setFunctions = F2(
	function (functions, groupped) {
		return _Utils_update(
			groupped,
			{Q: functions});
	});
var author$project$VerifyExamples$Ast$Grouped$setImports = F2(
	function (imports, groupped) {
		return _Utils_update(
			groupped,
			{R: imports});
	});
var author$project$VerifyExamples$Ast$Grouped$setTypes = F2(
	function (types, groupped) {
		return _Utils_update(
			groupped,
			{U: types});
	});
var author$project$VerifyExamples$Ast$Grouped$group = F2(
	function (ast, acc) {
		group:
		while (true) {
			if (!ast.b) {
				return acc;
			} else {
				switch (ast.a.$) {
					case 0:
						if (ast.b.b && (ast.b.a.$ === 1)) {
							var assertion = ast.a.a;
							var _n1 = ast.b;
							var expectation = _n1.a.a;
							var rest = _n1.b;
							return A2(
								author$project$VerifyExamples$Ast$Grouped$group,
								rest,
								function (x) {
									return A2(author$project$VerifyExamples$Ast$Grouped$setExamples, x, acc);
								}(
									A2(
										elm$core$List$cons,
										{ah: assertion, an: expectation},
										acc.P)));
						} else {
							var assertion = ast.a.a;
							var rest = ast.b;
							var $temp$ast = rest,
								$temp$acc = acc;
							ast = $temp$ast;
							acc = $temp$acc;
							continue group;
						}
					case 1:
						var str = ast.a.a;
						var rest = ast.b;
						var $temp$ast = rest,
							$temp$acc = acc;
						ast = $temp$ast;
						acc = $temp$acc;
						continue group;
					case 2:
						var str = ast.a.a;
						var rest = ast.b;
						return A2(
							author$project$VerifyExamples$Ast$Grouped$group,
							rest,
							function (x) {
								return A2(author$project$VerifyExamples$Ast$Grouped$setImports, x, acc);
							}(
								A2(elm$core$List$cons, str, acc.R)));
					case 4:
						var str = ast.a.a;
						var rest = ast.b;
						return A2(
							author$project$VerifyExamples$Ast$Grouped$group,
							rest,
							function (x) {
								return A2(author$project$VerifyExamples$Ast$Grouped$setTypes, x, acc);
							}(
								A2(elm$core$List$cons, str, acc.U)));
					default:
						var _n2 = ast.a;
						var name = _n2.a;
						var str = _n2.b;
						var rest = ast.b;
						return A2(
							author$project$VerifyExamples$Ast$Grouped$group,
							rest,
							function (x) {
								return A2(author$project$VerifyExamples$Ast$Grouped$setFunctions, x, acc);
							}(
								A2(
									elm$core$List$cons,
									{ar: str, aA: name},
									acc.Q)));
				}
			}
		}
	});
var author$project$VerifyExamples$Ast$Grouped$fromAst = function (ast) {
	return A2(author$project$VerifyExamples$Ast$Grouped$group, ast, author$project$VerifyExamples$Ast$Grouped$empty);
};
var author$project$VerifyExamples$Ast$Intermediate$atLeastASpace = function (str) {
	return (str === '') ? ' ' : str;
};
var author$project$VerifyExamples$Ast$Intermediate$arrowRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('\\s\\-\\->\\s'));
var author$project$VerifyExamples$Ast$Intermediate$expectationRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^\\-\\->\\s(.*)'));
var elm$regex$Regex$contains = _Regex_contains;
var author$project$VerifyExamples$Ast$Intermediate$breakIntoTwoLines = function (a) {
	return A2(elm$regex$Regex$contains, author$project$VerifyExamples$Ast$Intermediate$expectationRegex, a) ? a : A3(author$project$Regex$Util$replaceAllWith, author$project$VerifyExamples$Ast$Intermediate$arrowRegex, '\n--> ', a);
};
var author$project$VerifyExamples$Ast$Intermediate$splitOneLiners = A2(elm$core$Basics$composeR, author$project$VerifyExamples$Ast$Intermediate$breakIntoTwoLines, elm$core$String$lines);
var author$project$VerifyExamples$Ast$Intermediate$commentLines = A2(
	elm$core$Basics$composeR,
	elm$core$String$lines,
	elm$core$List$concatMap(author$project$VerifyExamples$Ast$Intermediate$splitOneLiners));
var author$project$Maybe$Util$oneOf = F2(
	function (fs, str) {
		oneOf:
		while (true) {
			if (!fs.b) {
				return elm$core$Maybe$Nothing;
			} else {
				var f = fs.a;
				var rest = fs.b;
				var _n1 = f(str);
				if (!_n1.$) {
					var result = _n1.a;
					return elm$core$Maybe$Just(result);
				} else {
					var $temp$fs = rest,
						$temp$str = str;
					fs = $temp$fs;
					str = $temp$str;
					continue oneOf;
				}
			}
		}
	});
var elm$regex$Regex$findAtMost = _Regex_findAtMost;
var author$project$Regex$Util$submatches = function (regex) {
	return A2(
		elm$core$Basics$composeR,
		A2(elm$regex$Regex$findAtMost, 1, regex),
		A2(
			elm$core$Basics$composeR,
			elm$core$List$concatMap(
				function ($) {
					return $.bd;
				}),
			elm$core$List$filterMap(elm$core$Basics$identity)));
};
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var author$project$Regex$Util$firstSubmatch = F2(
	function (regex, str) {
		return elm$core$List$head(
			A2(author$project$Regex$Util$submatches, regex, str));
	});
var author$project$VerifyExamples$Ast$Intermediate$ArrowPrefix = 0;
var author$project$VerifyExamples$Ast$Intermediate$Expression = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var author$project$VerifyExamples$Ast$Intermediate$ExpressionNotPrefixed = function (a) {
	return {$: 0, a: a};
};
var author$project$VerifyExamples$Ast$Intermediate$ImportPrefix = 1;
var author$project$VerifyExamples$Ast$Intermediate$NewLine = {$: 3};
var author$project$VerifyExamples$Ast$Intermediate$TypePrefix = 2;
var author$project$VerifyExamples$Ast$Intermediate$assertionRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^(.*)'));
var author$project$VerifyExamples$Ast$Intermediate$importRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^(import\\s.*)'));
var author$project$VerifyExamples$Ast$Intermediate$localFunctionRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^(\\w+\\s:\\s.*)'));
var author$project$VerifyExamples$Ast$Intermediate$newLineRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('(^\\s*$)'));
var author$project$VerifyExamples$Ast$Intermediate$Function = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var author$project$VerifyExamples$Ast$Intermediate$functionNameRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('(\\w+)\\s:'));
var author$project$VerifyExamples$Ast$Intermediate$toFunctionExpression = function (str) {
	return function (x) {
		return A2(author$project$VerifyExamples$Ast$Intermediate$Function, x, str);
	}(
		A2(
			elm$core$Maybe$withDefault,
			'no function name given!',
			A2(author$project$Regex$Util$firstSubmatch, author$project$VerifyExamples$Ast$Intermediate$functionNameRegex, str)));
};
var author$project$VerifyExamples$Ast$Intermediate$typeRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^(type\\s.*)'));
var author$project$VerifyExamples$Ast$Intermediate$toIntermediateAst = author$project$Maybe$Util$oneOf(
	_List_fromArray(
		[
			A2(
			elm$core$Basics$composeR,
			author$project$Regex$Util$firstSubmatch(author$project$VerifyExamples$Ast$Intermediate$newLineRegex),
			elm$core$Maybe$map(
				elm$core$Basics$always(author$project$VerifyExamples$Ast$Intermediate$NewLine))),
			A2(
			elm$core$Basics$composeR,
			author$project$Regex$Util$firstSubmatch(author$project$VerifyExamples$Ast$Intermediate$importRegex),
			elm$core$Maybe$map(
				author$project$VerifyExamples$Ast$Intermediate$Expression(1))),
			A2(
			elm$core$Basics$composeR,
			author$project$Regex$Util$firstSubmatch(author$project$VerifyExamples$Ast$Intermediate$typeRegex),
			elm$core$Maybe$map(
				author$project$VerifyExamples$Ast$Intermediate$Expression(2))),
			A2(
			elm$core$Basics$composeR,
			author$project$Regex$Util$firstSubmatch(author$project$VerifyExamples$Ast$Intermediate$expectationRegex),
			elm$core$Maybe$map(
				author$project$VerifyExamples$Ast$Intermediate$Expression(0))),
			A2(
			elm$core$Basics$composeR,
			author$project$Regex$Util$firstSubmatch(author$project$VerifyExamples$Ast$Intermediate$localFunctionRegex),
			elm$core$Maybe$map(author$project$VerifyExamples$Ast$Intermediate$toFunctionExpression)),
			A2(
			elm$core$Basics$composeR,
			author$project$Regex$Util$firstSubmatch(author$project$VerifyExamples$Ast$Intermediate$assertionRegex),
			elm$core$Maybe$map(author$project$VerifyExamples$Ast$Intermediate$ExpressionNotPrefixed))
		]));
var author$project$VerifyExamples$Ast$Intermediate$fromString = A2(
	elm$core$Basics$composeR,
	author$project$VerifyExamples$Ast$Intermediate$commentLines,
	A2(
		elm$core$Basics$composeR,
		elm$core$List$map(author$project$VerifyExamples$Ast$Intermediate$atLeastASpace),
		elm$core$List$filterMap(author$project$VerifyExamples$Ast$Intermediate$toIntermediateAst)));
var author$project$VerifyExamples$Ast$Intermediate$isArrowPrefixed = function (ast) {
	if ((ast.$ === 1) && (!ast.a)) {
		var _n1 = ast.a;
		return true;
	} else {
		return false;
	}
};
var author$project$VerifyExamples$Ast$Intermediate$isPrefixed = function (ast) {
	if (!ast.$) {
		return false;
	} else {
		return true;
	}
};
var author$project$VerifyExamples$Ast$Intermediate$breaksGroup = F2(
	function (x, y) {
		switch (x.$) {
			case 3:
				return false;
			case 0:
				return !author$project$VerifyExamples$Ast$Intermediate$isPrefixed(y);
			case 2:
				return !author$project$VerifyExamples$Ast$Intermediate$isPrefixed(y);
			default:
				var prefix = x.a;
				switch (prefix) {
					case 1:
						return !author$project$VerifyExamples$Ast$Intermediate$isPrefixed(y);
					case 2:
						return !author$project$VerifyExamples$Ast$Intermediate$isPrefixed(y);
					default:
						return author$project$VerifyExamples$Ast$Intermediate$isArrowPrefixed(y);
				}
		}
	});
var author$project$VerifyExamples$Ast$Assertion = function (a) {
	return {$: 0, a: a};
};
var author$project$VerifyExamples$Ast$Expectation = function (a) {
	return {$: 1, a: a};
};
var author$project$VerifyExamples$Ast$Function = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var author$project$VerifyExamples$Ast$Import = function (a) {
	return {$: 2, a: a};
};
var author$project$VerifyExamples$Ast$Type = function (a) {
	return {$: 4, a: a};
};
var author$project$VerifyExamples$Ast$Intermediate$intermediateToAst = F2(
	function (ast, str) {
		switch (ast.$) {
			case 0:
				return elm$core$Maybe$Just(
					author$project$VerifyExamples$Ast$Assertion(str));
			case 1:
				switch (ast.a) {
					case 0:
						var _n1 = ast.a;
						return elm$core$Maybe$Just(
							author$project$VerifyExamples$Ast$Expectation(str));
					case 1:
						var _n2 = ast.a;
						return elm$core$Maybe$Just(
							author$project$VerifyExamples$Ast$Import(str));
					default:
						var _n3 = ast.a;
						return elm$core$Maybe$Just(
							author$project$VerifyExamples$Ast$Type(str));
				}
			case 2:
				var name = ast.a;
				return elm$core$Maybe$Just(
					A2(author$project$VerifyExamples$Ast$Function, name, str));
			default:
				return elm$core$Maybe$Nothing;
		}
	});
var author$project$VerifyExamples$Ast$Intermediate$toString = function (ast) {
	switch (ast.$) {
		case 0:
			var str = ast.a;
			return str;
		case 1:
			var str = ast.b;
			return str;
		case 2:
			var str = ast.b;
			return str;
		default:
			return '\n';
	}
};
var author$project$VerifyExamples$Ast$Intermediate$intermediatesToAst = function (_n0) {
	var first = _n0.a;
	var rest = _n0.b;
	return A2(
		author$project$VerifyExamples$Ast$Intermediate$intermediateToAst,
		first,
		author$project$String$Util$unlines(
			A2(
				elm$core$List$map,
				author$project$VerifyExamples$Ast$Intermediate$toString,
				A2(elm$core$List$cons, first, rest))));
};
var elm_community$list_extra$List$Extra$oneGroupWhileHelper = F3(
	function (condition, first, list) {
		if (!list.b) {
			return _Utils_Tuple2(_List_Nil, _List_Nil);
		} else {
			var second = list.a;
			var rest = list.b;
			if (A2(condition, first, second)) {
				var _n1 = A3(elm_community$list_extra$List$Extra$oneGroupWhileHelper, condition, second, rest);
				var thisGroup = _n1.a;
				var ungroupedRest = _n1.b;
				return _Utils_Tuple2(
					A2(elm$core$List$cons, second, thisGroup),
					ungroupedRest);
			} else {
				return _Utils_Tuple2(_List_Nil, list);
			}
		}
	});
var elm_community$list_extra$List$Extra$accumulateGroupWhile = F3(
	function (condition, list, accum) {
		accumulateGroupWhile:
		while (true) {
			if (!list.b) {
				return elm$core$List$reverse(accum);
			} else {
				var first = list.a;
				var rest = list.b;
				var _n1 = A3(elm_community$list_extra$List$Extra$oneGroupWhileHelper, condition, first, rest);
				var thisGroup = _n1.a;
				var ungroupedRest = _n1.b;
				var $temp$condition = condition,
					$temp$list = ungroupedRest,
					$temp$accum = A2(
					elm$core$List$cons,
					_Utils_Tuple2(first, thisGroup),
					accum);
				condition = $temp$condition;
				list = $temp$list;
				accum = $temp$accum;
				continue accumulateGroupWhile;
			}
		}
	});
var elm_community$list_extra$List$Extra$groupWhile = F2(
	function (condition, list) {
		return A3(elm_community$list_extra$List$Extra$accumulateGroupWhile, condition, list, _List_Nil);
	});
var author$project$VerifyExamples$Ast$Intermediate$toAst = function (ast) {
	return A2(
		elm$core$List$filterMap,
		author$project$VerifyExamples$Ast$Intermediate$intermediatesToAst,
		A2(elm_community$list_extra$List$Extra$groupWhile, author$project$VerifyExamples$Ast$Intermediate$breaksGroup, ast));
};
var author$project$VerifyExamples$Ast$Grouped$importToString = function (_n0) {
	var import_ = _n0;
	return import_;
};
var author$project$VerifyExamples$Ast$Grouped$typeToString = function (_n0) {
	var type_ = _n0;
	return type_;
};
var author$project$VerifyExamples$Ast$Grouped$functionInfo = function (_n0) {
	var info = _n0;
	return info;
};
var author$project$VerifyExamples$Function$Function = elm$core$Basics$identity;
var elm$core$String$contains = _String_contains;
var author$project$VerifyExamples$Function$isUsedInExample = F2(
	function (_n0, _n1) {
		var name = _n0.aA;
		var assertion = _n1.ah;
		var expectation = _n1.an;
		return A2(elm$core$String$contains, name, assertion) || A2(elm$core$String$contains, name, expectation);
	});
var author$project$VerifyExamples$Function$inAnyExample = F2(
	function (examples, _function) {
		return A2(
			elm$core$List$any,
			author$project$VerifyExamples$Function$isUsedInExample(_function),
			examples);
	});
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var author$project$VerifyExamples$Function$inAnyFunction = F2(
	function (functions, _n0) {
		var name = _n0.aA;
		return A2(
			elm$core$List$any,
			A2(
				elm$core$Basics$composeL,
				elm$core$String$contains(name),
				author$project$VerifyExamples$Function$toString),
			functions);
	});
var elm$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _n0) {
				var trues = _n0.a;
				var falses = _n0.b;
				return pred(x) ? _Utils_Tuple2(
					A2(elm$core$List$cons, x, trues),
					falses) : _Utils_Tuple2(
					trues,
					A2(elm$core$List$cons, x, falses));
			});
		return A3(
			elm$core$List$foldr,
			step,
			_Utils_Tuple2(_List_Nil, _List_Nil),
			list);
	});
var author$project$VerifyExamples$Function$usedFunctions = function (_n0) {
	var used = _n0.a;
	var fns = _n0.b;
	var _n1 = A2(
		elm$core$List$partition,
		author$project$VerifyExamples$Function$inAnyFunction(used),
		fns);
	if (!_n1.a.b) {
		return used;
	} else {
		if (!_n1.b.b) {
			var alsoUsed = _n1.a;
			return _Utils_ap(used, alsoUsed);
		} else {
			var rest = _n1;
			return _Utils_ap(
				used,
				author$project$VerifyExamples$Function$usedFunctions(rest));
		}
	}
};
var author$project$VerifyExamples$Function$toFunctions = function (examples) {
	return A2(
		elm$core$Basics$composeR,
		elm$core$List$map(
			A2(elm$core$Basics$composeR, author$project$VerifyExamples$Ast$Grouped$functionInfo, elm$core$Basics$identity)),
		A2(
			elm$core$Basics$composeR,
			elm$core$List$partition(
				author$project$VerifyExamples$Function$inAnyExample(examples)),
			author$project$VerifyExamples$Function$usedFunctions));
};
var author$project$VerifyExamples$Test$Test = elm$core$Basics$identity;
var author$project$VerifyExamples$Test$fromExamples = function (functionToTest) {
	return elm$core$List$map(
		function (_n0) {
			var assertion = _n0.ah;
			var expectation = _n0.an;
			return {ah: assertion, an: expectation, as: functionToTest};
		});
};
var author$project$VerifyExamples$TestSuite$fromAst = F2(
	function (fnName, _n0) {
		var imports = _n0.R;
		var types = _n0.U;
		var functions = _n0.Q;
		var examples = _n0.P;
		return {
			a1: A2(author$project$VerifyExamples$Function$toFunctions, examples, functions),
			R: A2(elm$core$List$map, author$project$VerifyExamples$Ast$Grouped$importToString, imports),
			bf: A2(author$project$VerifyExamples$Test$fromExamples, fnName, examples),
			U: A2(elm$core$List$map, author$project$VerifyExamples$Ast$Grouped$typeToString, types)
		};
	});
var author$project$VerifyExamples$Parser$parse = function (_n0) {
	var snippet = _n0.ac;
	var functionName = _n0.X;
	return A2(
		author$project$VerifyExamples$TestSuite$fromAst,
		functionName,
		author$project$VerifyExamples$Ast$Grouped$fromAst(
			author$project$VerifyExamples$Ast$Intermediate$toAst(
				author$project$VerifyExamples$Ast$Intermediate$fromString(snippet))));
};
var author$project$VerifyExamples$Elm$toTestSuite = function (snip) {
	if (!snip.$) {
		var snippet = snip.a;
		return author$project$VerifyExamples$Parser$parse(
			{X: elm$core$Maybe$Nothing, ac: snippet});
	} else {
		var snippet = snip.a.ac;
		var functionName = snip.a.X;
		return author$project$VerifyExamples$Parser$parse(
			{
				X: elm$core$Maybe$Just(functionName),
				ac: snippet
			});
	}
};
var author$project$VerifyExamples$Elm$ExposedApi$moduleExposing = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString(
		elm$core$String$concat(
			_List_fromArray(
				['module', '[^]*?exposing', '[^]*?\\(', '([^]*?)(\\)\\nimport|\\)\\n\\n)']))));
var author$project$VerifyExamples$Elm$ExposedApi$typeConstructors = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('\\([^]*?\\)'));
var elm$core$String$trim = _String_trim;
var author$project$VerifyExamples$Elm$ExposedApi$toExposedDefinition = function (match) {
	if (match === '..') {
		return author$project$VerifyExamples$Elm$ExposedApi$All;
	} else {
		var defs = match;
		return author$project$VerifyExamples$Elm$ExposedApi$Explicitly(
			A2(
				elm$core$List$map,
				A2(
					elm$core$Basics$composeL,
					A2(author$project$Regex$Util$replaceAllWith, author$project$VerifyExamples$Elm$ExposedApi$typeConstructors, ''),
					elm$core$String$trim),
				A2(elm$core$String$split, ',', defs)));
	}
};
var author$project$VerifyExamples$Elm$ExposedApi$parse = function (value) {
	return A2(
		elm$core$Maybe$withDefault,
		author$project$VerifyExamples$Elm$ExposedApi$None,
		A2(
			elm$core$Maybe$map,
			author$project$VerifyExamples$Elm$ExposedApi$toExposedDefinition,
			A2(author$project$Regex$Util$firstSubmatch, author$project$VerifyExamples$Elm$ExposedApi$moduleExposing, value)));
};
var author$project$Regex$Util$newline = '\u000d?\n';
var author$project$VerifyExamples$Elm$Snippet$commentRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString(
		elm$core$String$concat(
			_List_fromArray(
				['{-\\|?([^]*?)-}', author$project$Regex$Util$newline, '(', '([^\\s(' + (author$project$Regex$Util$newline + ')]+)'), '\\s[:=]', ')?']))));
var author$project$VerifyExamples$Elm$Snippet$FunctionDoc = function (a) {
	return {$: 1, a: a};
};
var author$project$VerifyExamples$Elm$Snippet$ModuleDoc = function (a) {
	return {$: 0, a: a};
};
var author$project$Regex$Util$replaceIf = F3(
	function (fn, _with, string) {
		return fn(string) ? _with : string;
	});
var elm$core$Basics$neq = _Utils_notEqual;
var elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(
			A3(elm$core$List$foldl, elm$core$Basics$min, x, xs));
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$String$any = _String_any;
var elm$core$String$length = _String_length;
var elm$core$String$slice = _String_slice;
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var author$project$Regex$Util$unindent = function (multilineSting) {
	var lines = elm$core$String$lines(multilineSting);
	var isNotWhitespace = function (_char) {
		return (_char !== ' ') && (_char !== '\t');
	};
	var countLeadingWhitespace = F2(
		function (count, line) {
			countLeadingWhitespace:
			while (true) {
				var _n0 = elm$core$String$uncons(line);
				if (_n0.$ === 1) {
					return count;
				} else {
					var _n1 = _n0.a;
					var _char = _n1.a;
					var rest = _n1.b;
					switch (_char) {
						case ' ':
							var $temp$count = count + 1,
								$temp$line = rest;
							count = $temp$count;
							line = $temp$line;
							continue countLeadingWhitespace;
						case '\t':
							var $temp$count = count + 1,
								$temp$line = rest;
							count = $temp$count;
							line = $temp$line;
							continue countLeadingWhitespace;
						default:
							return count;
					}
				}
			}
		});
	var minLead = A2(
		elm$core$Maybe$withDefault,
		0,
		elm$core$List$minimum(
			A2(
				elm$core$List$map,
				countLeadingWhitespace(0),
				A2(
					elm$core$List$filter,
					elm$core$String$any(isNotWhitespace),
					lines))));
	return A2(
		elm$core$String$join,
		'\n',
		A2(
			elm$core$List$map,
			elm$core$String$dropLeft(minLead),
			lines));
};
var author$project$Regex$Util$replaceLinesWith = F2(
	function (regex, _with) {
		return A2(
			elm$core$Basics$composeR,
			elm$core$String$lines,
			A2(
				elm$core$Basics$composeR,
				elm$core$List$map(
					A2(
						author$project$Regex$Util$replaceIf,
						elm$regex$Regex$contains(regex),
						_with)),
				A2(
					elm$core$Basics$composeR,
					elm$core$String$join('\n'),
					author$project$Regex$Util$unindent)));
	});
var author$project$String$Util$unindent = author$project$Regex$Util$unindent;
var author$project$VerifyExamples$Elm$Snippet$proseLineRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^\\s?\\s?\\s?[^\\s]'));
var author$project$VerifyExamples$Elm$Snippet$cleanComment = function (comment) {
	return author$project$String$Util$unindent(
		A3(author$project$Regex$Util$replaceLinesWith, author$project$VerifyExamples$Elm$Snippet$proseLineRegex, '', comment));
};
var author$project$VerifyExamples$Elm$Snippet$toSnippet = function (matches) {
	if (((matches.b && (!matches.a.$)) && matches.b.b) && matches.b.b.b) {
		if (matches.b.b.a.$ === 1) {
			var comment = matches.a.a;
			var _n1 = matches.b;
			var _n2 = _n1.b;
			var _n3 = _n2.a;
			return elm$core$Maybe$Just(
				author$project$VerifyExamples$Elm$Snippet$ModuleDoc(
					author$project$VerifyExamples$Elm$Snippet$cleanComment(comment)));
		} else {
			var comment = matches.a.a;
			var _n4 = matches.b;
			var _n5 = _n4.b;
			var functionName = _n5.a.a;
			return elm$core$Maybe$Just(
				author$project$VerifyExamples$Elm$Snippet$FunctionDoc(
					{
						X: functionName,
						ac: author$project$VerifyExamples$Elm$Snippet$cleanComment(comment)
					}));
		}
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$regex$Regex$find = _Regex_findAtMost(_Regex_infinity);
var author$project$VerifyExamples$Elm$Snippet$parse = A2(
	elm$core$Basics$composeR,
	elm$regex$Regex$find(author$project$VerifyExamples$Elm$Snippet$commentRegex),
	elm$core$List$filterMap(
		A2(
			elm$core$Basics$composeL,
			author$project$VerifyExamples$Elm$Snippet$toSnippet,
			function ($) {
				return $.bd;
			})));
var author$project$VerifyExamples$Elm$parse = function (fileText) {
	return {
		ao: author$project$VerifyExamples$Elm$ExposedApi$parse(fileText),
		af: A2(
			elm$core$List$map,
			author$project$VerifyExamples$Elm$toTestSuite,
			author$project$VerifyExamples$Elm$Snippet$parse(fileText))
	};
};
var author$project$VerifyExamples$Markdown$Parsed = function (testSuites) {
	return {af: testSuites};
};
var author$project$VerifyExamples$Markdown$toTestSuite = function (_n0) {
	var snippet = _n0;
	return author$project$VerifyExamples$Parser$parse(
		{X: elm$core$Maybe$Nothing, ac: snippet});
};
var author$project$VerifyExamples$Markdown$Snippet$commentRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString(
		elm$core$String$concat(
			_List_fromArray(
				['```elm', author$project$Regex$Util$newline, '([^]*?)', author$project$Regex$Util$newline, '```']))));
var author$project$VerifyExamples$Markdown$Snippet$Snippet = elm$core$Basics$identity;
var author$project$VerifyExamples$Markdown$Snippet$toSnippet = function (matches) {
	if ((matches.b && (!matches.a.$)) && (!matches.b.b)) {
		var comment = matches.a.a;
		return elm$core$Maybe$Just(comment);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var author$project$VerifyExamples$Markdown$Snippet$parse = A2(
	elm$core$Basics$composeR,
	elm$regex$Regex$find(author$project$VerifyExamples$Markdown$Snippet$commentRegex),
	elm$core$List$filterMap(
		A2(
			elm$core$Basics$composeL,
			author$project$VerifyExamples$Markdown$Snippet$toSnippet,
			function ($) {
				return $.bd;
			})));
var author$project$VerifyExamples$Markdown$parse = function (fileText) {
	return author$project$VerifyExamples$Markdown$Parsed(
		A2(
			elm$core$List$map,
			author$project$VerifyExamples$Markdown$toTestSuite,
			author$project$VerifyExamples$Markdown$Snippet$parse(fileText)));
};
var author$project$VerifyExamples$update = function (msg) {
	switch (msg.$) {
		case 0:
			var test = msg.a;
			return author$project$VerifyExamples$readFile(test);
		case 1:
			var source = msg.a;
			return function (_n1) {
				var warnings = _n1.a;
				var tests = _n1.b;
				return elm$core$Platform$Cmd$batch(
					_List_fromArray(
						[
							author$project$VerifyExamples$generateTests(tests),
							A2(author$project$VerifyExamples$reportWarnings, source._, warnings)
						]));
			}(
				A2(
					author$project$VerifyExamples$compileElm,
					source,
					author$project$VerifyExamples$Elm$parse(source.G)));
		case 2:
			var source = msg.a;
			return author$project$VerifyExamples$generateTests(
				A2(
					author$project$VerifyExamples$compileMarkdown,
					source,
					author$project$VerifyExamples$Markdown$parse(source.G)));
		default:
			var err = msg.a;
			return author$project$VerifyExamples$reportError(
				elm$json$Json$Encode$string(
					elm$json$Json$Decode$errorToString(err)));
	}
};
var elm$core$Platform$worker = _Platform_worker;
var elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var author$project$VerifyExamples$main = elm$core$Platform$worker(
	{
		a5: A2(
			elm$core$Basics$composeR,
			author$project$VerifyExamples$init,
			elm$core$Tuple$pair(0)),
		be: author$project$VerifyExamples$subscriptions,
		bh: F2(
			function (msg, _n0) {
				return _Utils_Tuple2(
					0,
					author$project$VerifyExamples$update(msg));
			})
	});
_Platform_export({'VerifyExamples':{'init':author$project$VerifyExamples$main(elm$json$Json$Decode$value)(0)}});}(this));