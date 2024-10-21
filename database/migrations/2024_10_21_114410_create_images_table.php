<?php

// use Illuminate\Database\Migrations\Migration;
// use Illuminate\Database\Schema\Blueprint;
// use Illuminate\Support\Facades\Schema;

// class CreateImagesTable extends Migration
// {
//     /**
//      * Run the migrations.
//      *
//      * @return void
//      */
//     public function up()
//     {
//         Schema::create('images', function (Blueprint $table) {
//             $table->id();
//             $table->foreignId('product_id')->constrained()->onDelete('cascade'); // Relasi ke tabel produk
//             $table->string('image_path'); // Kolom untuk menyimpan path gambar
//             $table->timestamps();
//         });

//     }

//     /**
//      * Reverse the migrations.
//      *
//      * @return void
//      */
//     public function down()
//     {
//         Schema::dropIfExists('images');
//     }
// }
