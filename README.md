# Backend Assessment Elevarm

<p align="center"><a href="https://rushjs.io/" target="_blank"><img src="https://rushjs.io/images/rush-horiz.svg" width="200"></a>
<a href="https://pnpm.io/id/" target="_blank"><img src="https://d33wubrfki0l68.cloudfront.net/017d7d8828700fa58a0abdcd5538124a95e4f491/7671d/id/img/pnpm-light.svg" width="100"></a>
<a href="https://nodejs.org/en" target="_blank"><img src="https://nodejs.org/static/images/logo.svg" width="200"></a>
<a href="https://www.mongodb.com/" target="_blank"><img src="https://webimages.mongodb.com/_com_assets/cms/kuyjf3vea2hg34taa-horizontal_default_slate_blue.svg?auto=format%252Ccompress" width="250"></a></p>

Projek ini masih dalam tahap pengembangan.

Projek ini dibuat untuk melengkapi proses recruitment sebagai Backend Developer di [elevarm.com](https://elevarm.com).

Beberapa dalam projek ini melihat ke beberapa projek yang ada di github.com dengan menerapkan modular monolith sebagai architecturenya.

Berikut beberapa projek yang saya ambil referesi dalam membuat projek ini:
* <a href="https://github.com/kgrzybek/modular-monolith-with-ddd" target="_blank">kgrzybek/modular-monolith-with-ddd</a>
* <a href="https://github.com/mgce/modular-monolith-nodejs" target="_blank">mgce/modular-monolith-nodejs</a>
* <a href="https://github.com/gustialfian/nodejs-modular-monolith" target="_blank">gustialfian/nodejs-modular-monolith</a>

Terima kasih untuk kalian semua.


## Prerequisite

* NodeJS >= 16
* PNPM
* Rush
* MongoDB

## Installation

Untuk mengelola projek ini harus menggunakan [Rush](https://rushjs.io/) sebagai orchestratornya dan [PNPM](https://pnpm.io/id/) sebagai package managernya, Oleh karena itu kedua library ini harus diinstall secara global dengan menggunakan command
```
npm install -g @microsoft/rush pnpm
```

Install semua package yang dibutuhkan oleh modules dengan command
``` 
rush install && rush update
```

## How to run a project?

### Local development
untuk menjalankan projek ini di local kita harus membuat file environtment terlebih dahulu
```
cp src/core/.env.example src/core/.env
```

lalu untuk menjalan projek ini dengan command
```
rush build
```

***Note :*** 

Pastikan service MongoDB sudah berjalan di port 27017
___

### Docker development
```
docker-compose up --build -d
```

akses projek di http://localhost:3010

## Documentation
https://documenter.getpostman.com/view/4027401/2s93JzKfds