<?php
/**
 * Created by: TriNQ
 * Date: 20-03-2018
 * Time: 16:00 PM
 */

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\News;

class NewsTransformer extends TransformerAbstract
{
    /**
     * @param News $news
     * @return  array
     */
    public function transform(News $news)
    {
        return $news->attributesToArray();
    }
}