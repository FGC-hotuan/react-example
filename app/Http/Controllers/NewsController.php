<?php
/**
 * Created by: TriNQ
 * Date: 21-03-2018
 * Time: 9:16 AM
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;

class NewsController extends Controller{

    public function index()
    {

        $news = News::paginate(4);
        return response()->json($news);
    }

    /*
     * parameter $request['title', 'content',..] is require
     * return to json [string 'status', string 'message']
     * if OK: status is 'ok'
     * else status is 'uFails'
     * */
    public function store(Request $request)
    {
        $validator = \Validator::make($request->input(), [
            'title' => 'required',
            'content' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['status'=> 'uFails','messages' => $validator->messages()]);
        }
        $news = new News();
        $news->title = $request->get('title');
        $news->content = $request->get('content');
        $news->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Created',
            'model' => $news,
        ]);
    }

    /*
     * parameter ($request['title', 'content',..], 'id') is require
     * return to json [string 'status', string 'message' ]
     * status have three values:
     *  'success' is everything good,
     *  'uFails' is user fails,
     *  'nFails' is something fails the same 404, etc..
     * */
    public function update(Request $request, $id)
    {

        $validator = \Validator::make($request->input(), [
            'title' => 'required',
            'content' => 'required',
        ]);
        if($validator->fails()) {
            return response()->json([
                'status' => 'uFails',
                'messages' => $validator->messages()
            ]);
        }
        $news = News::find($id);

        if(is_null($news)) {
            return response()
                ->json([
                    'status' => 'nFails',
                    'message' => 'News id='.$id.' do not exist'
                ]);
        }else {
            $news->title = $request->get('title');
            $news->content = $request->get('content');
            $news->save();
            return response()->json([
                'status' => 'success',
                'message' => 'Uploaded'
            ]);
        }
    }

    public function show($id)
    {
        $news = $news = News::find($id);

        return response()->json($news);
    }

    public function destroy($id)
    {
        $news = $news = News::find($id);
        if (is_null($news)) {
            return response()->json([
                'status' => 'nFails',
                'message' => 'News id='.$id.' do not exist'
            ]);
        }
        try{
            $news->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'deleted'
            ]);
        }
        catch(\Exception $e)
        {
            return response()->json([
                'status' => 'nFails',
                'message' => $e->getMessage()
            ]);
        }
    }
}