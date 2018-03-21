<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\User;

class UserTransformer extends TransformerAbstract
{
    /**
     * @param User $user
     * @return  array
     */
    public function transform(User $user)
    {
        return $user->attributesToArray();
    }
}