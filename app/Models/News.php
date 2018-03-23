<?php
/**
 * Created by: TriNQ
 * Date: 21-03-2018
 * Time: 9:14 AM
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class News extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

    protected $appends = [
        'content_truncated',
        'image_url'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    public function getContentTruncatedAttribute(){
        $content = $this->content;
        return Str::limit(strip_tags($content), 350);
    }
    public  function getImageUrlAttribute(){
        return asset('http://dev.site.vn/storage/upload/'.$this->image);
    }
}
