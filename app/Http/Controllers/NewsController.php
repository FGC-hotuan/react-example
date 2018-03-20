<?php
/**
 * Created by: TriNQ
 * Date: 20-03-2018
 * Time: 14:59 PM
 */

namespace App\Http\Controllers;

use App\Transformers\NewsTransformer;
use Illuminate\Http\Request;
use App\Models\News;

class NewsController extends Controller{

    public function index()
    {
        $news = News::paginate(10);
        return $this->response->paginator($news, new NewsTransformer);
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
            $news->save();
        }

        return $news;
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