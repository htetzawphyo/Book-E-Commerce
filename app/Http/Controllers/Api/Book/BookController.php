<?php

namespace App\Http\Controllers\Api\Book;

use App\Models\Book;
use Illuminate\Http\Request;
use App\Helper\ResponseHelper;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\BookCreateRequest;
use App\Http\Requests\BookUpdateRequest;
use App\Http\Resources\Book\BookDetailResource;
use App\Http\Resources\Book\BooksResource;
use Exception;

class BookController extends Controller
{
    public function __construct()
    {
        $this->middleware('isAdmin');
    }
    
    public function index(Request $request) {
        $query = Book::with('author')->orderByDesc('created_at');

        if($request->search) {
            $query->where('name', 'like', '%'. $request->search .'%');
        }

        $books = $query->paginate(10);

        return BooksResource::collection($books)->additional(['message' => 'success']);
    }

    public function store(BookCreateRequest $request) {
        try{
            $img_name = time() . '_' . $request->file('image')->getClientOriginalName();
            Storage::put('media/' . $img_name, file_get_contents($request->file('image')));
    
            $book = new Book();
            $book->name = $request->name;
            $book->price = $request->price;
            $book->quantity = $request->quantity;
            $book->author_id = $request->author_id;
            $book->image = $img_name;
            
            if($request->description) {
                $book->description = $request->description;
            } else {
                $book->description = '';
            }

            $book->save();
    
            return ResponseHelper::created($book, 'Successfully uploaded.');
        } catch(Exception $err) {
            return ResponseHelper::fail($err->getMessage());
        }
    }

    public function show(Book $book) {
        return ResponseHelper::success(new BookDetailResource($book));
    }

    public function update(BookUpdateRequest $request, Book $book) {
        try{
            $book->name = $request->name;
            $book->price = $request->price;
            $book->quantity = $request->quantity;
            $book->author_id = $request->author_id;
            
            if($request->description) {
                $book->description = $request->description;
            } else {
                $book->description = '';
            }
    
            if($request->hasFile('image')) {
                $img_name = time() . '_' . $request->file('image')->getClientOriginalName();
                Storage::put('media/' . $img_name, file_get_contents($request->file('image')));
                $book->image = $img_name;
            }
    
            $book->save();
    
            return ResponseHelper::success([], 'Successfully updated.');
        } catch(Exception $err) {
            return ResponseHelper::fail($err->getMessage());
        }
    }

    public function destroy(Book $book) {
        $image = $book->image;
        Storage::delete('media/'.$image);
        $book->delete();

        return ResponseHelper::success([], 'Successfully deleted.');
    }
}
