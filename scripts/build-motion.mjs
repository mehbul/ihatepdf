import fs from 'node:fs/promises';
import path from 'node:path';

// Shared by the private root build and the public Pages build; no remote assets.
export async function installMotionAssets(directory='dist') {
  await fs.copyFile('src/app/motion.mjs',path.join(directory,'motion.mjs'));
  await fs.copyFile('src/styles/motion.css',path.join(directory,'motion.css'));
  async function visit(folder) {
    for(const entry of await fs.readdir(folder,{withFileTypes:true})) {
      const file=path.join(folder,entry.name);
      if(entry.isDirectory()){await visit(file);continue;}
      if(!entry.name.endsWith('.html'))continue;
      const html=await fs.readFile(file,'utf8');
      if(html.includes('data-site-motion'))continue;
      await fs.writeFile(file,html.replace('</head>','<link rel="stylesheet" href="/motion.css" data-site-motion></head>').replace('</body>','<script type="module" src="/motion.mjs"></script></body>'));
    }
  }
  await visit(directory);
}
