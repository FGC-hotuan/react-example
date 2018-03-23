<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageController extends Controller
{
    protected $domain = 'http://dev.site.vn';

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|string
     */
    public function store(Request $request)
    {
        if($request->hasFile('image')) {
            $path = $request->file('image')->store('public/upload/'.date("Y-m-d"));
            $arrPath = explode('/',$path);
            $sortPath = date("Y-m-d").'/'.last($arrPath);
            $fullPath = asset($this->domain.'/storage/upload/'.$sortPath);
            return response()->json(['fullPath' => $fullPath,'sortPath' => $sortPath]);
        }else{
            return 'Image file not exist';
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }
}
