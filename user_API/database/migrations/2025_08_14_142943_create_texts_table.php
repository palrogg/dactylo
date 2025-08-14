<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('texts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('author');
            $table->integer('publication_year')->nullable()->default(null); // only for books
            $table->text('content');
            $table->date('display_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('texts');
    }
};
