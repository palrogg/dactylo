<?php

namespace App\Models;

use ApiPlatform\Metadata\ApiResource;
use Illuminate\Database\Eloquent\Model;
use App\Http\Requests\TextWriteRequest;

#[ApiResource(
    rules: TextWriteRequest::class,
)]
class Text extends Model
{
    //
}
