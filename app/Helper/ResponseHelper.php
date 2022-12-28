<?php

namespace App\Helper;

class ResponseHelper 
{ 
    public static function success($data = [], $message = 'success') {
        return response()->json([
            'data' => $data,
            'message' => $message
        ], 200);
    }

    public static function created($data = [], $message = 'created') {
        return response()->json([
            'data' => $data,
            'message' => $message
        ], 201);
    }

    public static function accepted($data = [], $message = 'accepted') {
        return response()->json([
            'data' => $data,
            'message' => $message
        ], 202);
    }

    public static function noContent($message = 'deleted') {
        return response()->json([
            'message' => $message
        ], 204);
    }

    public static function forbidden($message) {
        return response()->json([
            'message' => $message
        ], 403);
    }

    public static function unauthorized($message) {
        return response()->json([
            'message' => $message
        ], 401);
    }

    public static function notFound($message) {
        return response()->json([
            'message' => $message
        ], 404);
    }

    public static function fail($message) {
        return response()->json([
            'message' => $message
        ],
        422
        );
    }
}