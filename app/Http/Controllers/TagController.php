<?php

namespace App\Http\Controllers;

use App\Models\tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        return tag::all();
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $tag=new tag;
        $tag->tagName=$request->tagName;
        $tag->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function show(tag $tag)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function edit(tag $tag)
    {
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$tag)
    {
        $editedTag=tag::find($tag);

        if($editedTag){
            $editedTag->tagName = $request->tagName;
            $editedTag->save();
        }else{
            return "not found";
        }

        

        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function destroy($tag)
    {
        $deleteTag=tag::find($tag);
        $deleteTag->delete();
    }

    public function upload(Request $request){
        $request->validate([
        'file'=> 'required|mimes:jpg,bmp,png'
        ]);
        $pic=time().'.'.$request->file->extension();
        $request->file->move(public_path('uploads'),$pic);
        return $pic;
    }

    public function deleteImage(Request $request){
        $filename=$request->imageName;
        $filepath=public_path().'/uploads/'.$filename;
        if(file_exists($filepath)){
            @unlink($filepath);
        }
        return "deleted";
    }
}
