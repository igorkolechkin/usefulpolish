<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsAdmin
{
	public function handle(Request $request, Closure $next)
	{
		if (!auth()->check() || auth()->user()->email !== 'admin@admin.com') {
			return redirect()->route('home');
		}

		return $next($request);
	}
}
