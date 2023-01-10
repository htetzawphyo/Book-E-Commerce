<?php

namespace App\Http\Controllers\Api\Author;

use App\Models\Author;
use Illuminate\Http\Request;
use App\Helper\ResponseHelper;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage; 
use App\Http\Requests\AuthorCreateRequest;
use App\Http\Requests\AuthorUpdateRequest;
use App\Http\Resources\Author\AuthorDetailResource;
use App\Http\Resources\Author\AuthorsResource;
use Illuminate\Support\Facades\Auth;

class AuthorController extends Controller
{
    public function index(Request $request) {
        $query = Author::orderByDesc('created_at');

        if($request->search) {
            $query->where('name', 'like', '%'. $request->search .'%');
        }

        $authors = $query->paginate(2);

        return AuthorsResource::collection($authors)->additional(['message' => 'success']);
     
    }

    public function store(AuthorCreateRequest $request) {
        $img_name = time() . '_' . $request->file('image')->getClientOriginalName();
        Storage::put('media/' . $img_name, file_get_contents($request->file('image')));

        $author = new Author();
        $author->name = $request->name;
        $author->description = $request->description;
        $author->image = $img_name;
        $author->save();

        return ResponseHelper::created($author, 'Successfully uploaded.');
    }

    public function show(Author $author) {
        return ResponseHelper::success(new AuthorDetailResource($author));
    }

    public function update(AuthorUpdateRequest $request, Author $author) {
        $author->name = $request->name;
        $author->description = $request->description;

        if($request->hasFile('image')) {
            $img_name = time() . '_' . $request->file('image')->getClientOriginalName();
            Storage::put('media/' . $img_name, file_get_contents($request->file('image')));
            $author->image = $img_name;
        }

        $author->save();

        return ResponseHelper::success([], 'Successfully updated.');
    }

    public function destroy(Author $author) {
        $image = $author->image;
        Storage::delete('media/'.$image);
        $author->delete();

        return ResponseHelper::success([], 'Successfully deleted.');
    }
}
