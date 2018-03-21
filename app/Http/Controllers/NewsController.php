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

        $news = News::paginate(1);
        return response()->json($news);
    }

    public function create()
    {

    }

    public function store(Request $request)
    {
        $news = new News();
        if($request->has(['title','content'])) {
            $news->title = $request->get('title');
            $news->content = $request->get('content');
        }
        /*if(!$news->save()){
            return response()->json([
                'error' => true,
                'errors' => $news->errors()
            ]);

        }*/
        return $news->save();
    }

    public function update(Request $request, $id)
    {
        $news = News::find($id);
        /*if(is_null($news))  {
            return response()
                ->json(['error' => 'News id='.$id.' dont exist']);
        }else {

        }*/
        $news->title = $request->get('title');
        $news->content = $request->get('content');
        $news->save();
        return $news;
    }

}