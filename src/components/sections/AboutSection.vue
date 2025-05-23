<script setup lang="ts">
const downloadResume = () => {
  // TODO: Implement resume download functionality
  console.log('Downloading resume...');
};

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/hendrius-felix',
    icon: 'M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm2.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/hendrius',
    icon: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z',
  },
  {
    name: 'Email',
    url: 'mailto:hendrius@email.com',
    icon: 'M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z',
  },
];
</script>

<template>
  <section id="about" class="min-h-screen flex items-center bg-[#111111] py-20">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-12 gap-12 items-center">
        <!-- Text Content -->
        <div class="lg:col-span-7 space-y-8">
          <div class="space-y-4">
            <h1 class="text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Hendrius Félix
            </h1>
            <p class="text-xl text-[#888] font-light">
              Full-Stack Developer | Backend & IoT Specialist
            </p>
          </div>

          <div class="prose prose-invert max-w-none space-y-4">
            <p class="text-lg text-[#D3D3D3] leading-relaxed">
              Mechanical Engineer turned Software Developer, currently pursuing an MBA in Software Engineering at PUC-Rio. 
              Specializing in backend development, automation systems, and IoT solutions.
            </p>
            
            <p class="text-lg text-[#D3D3D3] leading-relaxed">
              With expertise in Node.js, TypeScript, and cloud infrastructure, I've architected and implemented 
              industrial-scale solutions integrating microservices, ESP32 devices, RFID systems, and real-time 
              WebSocket communications.
            </p>

            <div class="flex flex-wrap gap-3 py-4">
              <span v-for="tech in ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'RabbitMQ', 'Vue.js']" 
                    :key="tech"
                    class="px-3 py-1 bg-white/5 rounded-full text-sm text-[#D3D3D3] border border-white/10">
                {{ tech }}
              </span>
            </div>
          </div>

          <div class="flex items-center gap-6 pt-4">
            <button @click="downloadResume" 
                    class="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-[#D3D3D3] transition-colors duration-300 flex items-center gap-2">
              <span>Download Resume</span>
            </button>
            
            <div class="flex gap-4">
              <a v-for="link in socialLinks" 
                 :key="link.name"
                 :href="link.url"
                 :title="link.name"
                 target="_blank"
                 rel="noopener noreferrer"
                 class="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300 border border-white/10">
                <svg class="w-5 h-5 text-[#D3D3D3]" viewBox="0 0 16 16" fill="currentColor">
                  <path :d="link.icon"/>
                </svg>
              </a>
            </div>
          </div>

          <p class="text-lg font-medium text-[#D3D3D3] pt-6 border-t border-white/10">
            "Technology with purpose. Code that matters."
          </p>
        </div>

        <!-- Profile Image -->
        <div class="lg:col-span-5">
          <div class="relative">
            <div class="aspect-square rounded-full overflow-hidden shadow-2xl border-4 border-white/10">
              <img 
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                alt="Hendrius Félix"
                class="w-full h-full object-cover"
              />
            </div>
            
            <!-- Stats Overlay -->
            <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
              <div class="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p class="text-xl font-bold text-white">2015</p>
                  <p class="text-[#888] text-sm">Since</p>
                </div>
                <div>
                  <p class="text-xl font-bold text-white">50+</p>
                  <p class="text-[#888] text-sm">Projects</p>
                </div>
                <div>
                  <p class="text-xl font-bold text-white">24</p>
                  <p class="text-[#888] text-sm">Age</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>