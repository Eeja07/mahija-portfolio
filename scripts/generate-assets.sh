#!/bin/bash
set -e

# Create directories
mkdir -p public/images/featured/cctv
mkdir -p public/images/featured/drone
mkdir -p public/images/featured/homelab
mkdir -p public/images/featured/untern
mkdir -p public/images/evidence
mkdir -p public/videos

# Helper to generate SVG and convert to WebP
gen_asset() {
  local filepath=$1
  local title=$2
  local subtitle=$3
  local category=$4
  local type=$5 # "image" or "video" or "og"

  # Determine dimensions
  local width=800
  local height=450
  if [ "$type" = "og" ]; then
    width=1200
    height=630
  fi

  local temp_svg="temp.svg"
  
  cat <<EOF > "$temp_svg"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 $width $height" width="$width" height="$height">
  <rect width="100%" height="100%" fill="#09090b" />
  
  <!-- Premium blueprint grid -->
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#18181b" stroke-width="1"/>
    </pattern>
    <pattern id="subgrid" width="10" height="10" patternUnits="userSpaceOnUse">
      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#0e0e11" stroke-width="0.5"/>
    </pattern>
  </defs>
  
  <rect width="100%" height="100%" fill="url(#subgrid)" />
  <rect width="100%" height="100%" fill="url(#grid)" />
  
  <!-- Outer glowing accent borders -->
  <rect x="20" y="20" width="$((width-40))" height="$((height-40))" fill="none" stroke="#27272a" stroke-width="1.5" rx="12" />
  <rect x="25" y="25" width="$((width-50))" height="$((height-50))" fill="none" stroke="#18181b" stroke-width="1" rx="8" />

  <!-- Core branding banner -->
  <text x="50" y="80" fill="#3b82f6" font-family="monospace" font-size="12" font-weight="bold" letter-spacing="2">$category</text>
  <text x="50" y="120" fill="#f4f4f5" font-family="sans-serif" font-size="28" font-weight="bold" letter-spacing="-0.5">$title</text>
  <text x="50" y="150" fill="#a1a1aa" font-family="sans-serif" font-size="14">$subtitle</text>

  <!-- Visual design schematic details based on type -->
EOF

  if [ "$type" = "og" ]; then
    cat <<EOF >> "$temp_svg"
  <!-- OG Details -->
  <text x="50" y="220" fill="#3b82f6" font-family="monospace" font-size="14" font-weight="bold">PORTFOLIO PREVIEW</text>
  <text x="50" y="280" fill="#f4f4f5" font-family="sans-serif" font-size="44" font-weight="bold">Mahija Ibad Pradipta</text>
  <text x="50" y="320" fill="#a1a1aa" font-family="sans-serif" font-size="18">Computer Engineering Student | Systems &amp; Infrastructure</text>

  <rect x="50" y="370" width="1050" height="1" fill="#27272a" />
  
  <!-- Parameters -->
  <text x="50" y="420" fill="#f4f4f5" font-family="monospace" font-size="12">DEBIAN 12</text>
  <text x="200" y="420" fill="#f4f4f5" font-family="monospace" font-size="12">DOCKER COMPOSE</text>
  <text x="400" y="420" fill="#f4f4f5" font-family="monospace" font-size="12">CLOUDFLARE TUNNEL</text>
  <text x="650" y="420" fill="#3b82f6" font-family="monospace" font-size="12">40+ REPOSITORIES</text>
  <text x="850" y="420" fill="#3b82f6" font-family="monospace" font-size="12">2.5M+ IMAGES</text>
  <text x="1020" y="420" fill="#3b82f6" font-family="monospace" font-size="12">6 ACTIVE NODES</text>

  <circle cx="1100" cy="120" r="80" fill="none" stroke="#27272a" stroke-width="1" />
  <circle cx="1100" cy="120" r="50" fill="none" stroke="#3b82f6" stroke-width="1.5" />
  <path d="M 1100 80 L 1100 160 M 1060 120 L 1140 120" stroke="#27272a" stroke-width="1" />
EOF
  else
    cat <<EOF >> "$temp_svg"
  <!-- Standard Schematic elements -->
  <circle cx="$((width-180))" cy="$((height-180))" r="100" fill="none" stroke="#18181b" stroke-width="1" />
  <circle cx="$((width-180))" cy="$((height-180))" r="70" fill="none" stroke="#27272a" stroke-width="1.5" />
  <circle cx="$((width-180))" cy="$((height-180))" r="40" fill="none" stroke="#3b82f6" stroke-width="2" />
  <line x1="$((width-280))" y1="$((height-180))" x2="$((width-80))" y2="$((height-180))" stroke="#27272a" stroke-width="0.8" />
  <line x1="$((width-180))" y1="$((height-280))" x2="$((width-180))" y2="$((height-80))" stroke="#27272a" stroke-width="0.8" />
  <rect x="50" y="200" width="400" height="180" fill="none" stroke="#27272a" stroke-width="1" rx="4" />
  <line x1="50" y1="230" x2="450" y2="230" stroke="#18181b" stroke-width="1" />
  <circle cx="70" cy="215" r="3" fill="#ef4444" />
  <circle cx="85" cy="215" r="3" fill="#eab308" />
  <circle cx="100" cy="215" r="3" fill="#22c55e" />
  <text x="120" y="218" fill="#a1a1aa" font-family="monospace" font-size="10">SYS_CONSOLE // ACTIVE</text>
  <text x="70" y="270" fill="#f4f4f5" font-family="monospace" font-size="12">> BOOT_SEQUENCE: OK</text>
  <text x="70" y="300" fill="#f4f4f5" font-family="monospace" font-size="12">> NODE_STATUS: ONLINE</text>
  <text x="70" y="330" fill="#3b82f6" font-family="monospace" font-size="12">> TELEMETRY_TRANSIT: 200 OK</text>
EOF
  fi

  echo "</svg>" >> "$temp_svg"

  # Convert SVG to target file format
  if [ "$type" = "og" ]; then
    convert "$temp_svg" "$filepath"
  else
    # Output webp directly
    convert "$temp_svg" "$filepath"
  fi
  rm "$temp_svg"
}

# Generate favicon.svg directly
cat <<EOF > public/favicon.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="6" fill="#09090b"/>
  <rect x="2" y="2" width="28" height="28" rx="4" fill="none" stroke="#27272a" stroke-width="1"/>
  <circle cx="16" cy="16" r="10" fill="none" stroke="#3b82f6" stroke-width="2"/>
  <circle cx="16" cy="16" r="4" fill="#f4f4f5"/>
</svg>
EOF

# Copy favicon.svg to favicon.ico (fallback using convert)
convert public/favicon.svg public/favicon.ico

# Generate OpenGraph Assets
gen_asset "public/og.png" "Mahija Ibad Pradipta" "Computer Engineering Student" "SYSTEM_SHOWCASE" "og"
gen_asset "public/social-preview.webp" "Mahija Ibad Pradipta" "Systems and Infrastructure Showcase" "SOCIAL_PREVIEW" "og"

# Generate CCTV Images
gen_asset "public/images/featured/cctv/dashboard.webp" "CCTV Surveillance Dashboard" "Self-hosted camera configuration feeds" "CCTV" "image"
gen_asset "public/images/featured/cctv/esp32.webp" "ESP32-CAM Core Board Node" "Pinout and battery management schemas" "CCTV" "image"
gen_asset "public/images/featured/cctv/inference.webp" "YOLO Bounding Box Target Frame" "Object classification confidence values" "CCTV" "image"
gen_asset "public/images/featured/cctv/notification.webp" "Telegram Alert Notifications" "Instant notification webhook captures" "CCTV" "image"

# Generate Drone Images
gen_asset "public/images/featured/drone/flight.webp" "Autonomous UAV Pathing Map" "MAVLink waypoint search trajectories" "DRONE" "image"
gen_asset "public/images/featured/drone/detection.webp" "Onboard YOLO Subject Tracker" "Target identification coordinates feed" "DRONE" "image"
gen_asset "public/images/featured/drone/mission.webp" "UAV Spiral Search Coverage" "Grid traversal metrics summary" "DRONE" "image"
gen_asset "public/images/featured/drone/telemetry.webp" "Telemetry Diagnostic Variables" "PX4 state estimator packets logs" "DRONE" "image"

# Generate Homelab Images
gen_asset "public/images/featured/homelab/nuc.webp" "Bare-Metal host hypervisor" "Intel NUC hardware cluster setup" "HOMELAB" "image"
gen_asset "public/images/featured/homelab/portainer.webp" "Docker Container Node Status" "Resource limits and memory monitor charts" "HOMELAB" "image"
gen_asset "public/images/featured/homelab/docker.webp" "Containerized Workloads stack" "Docker Compose multi-service layouts" "HOMELAB" "image"
gen_asset "public/images/featured/homelab/cloudflare.webp" "Cloudflare Edge Tunnel ingress" "WAF secure proxy routing mapping" "HOMELAB" "image"

# Generate UNTERN Images
gen_asset "public/images/featured/untern/home.webp" "Job aggregator Landing Page" "Student internship search homepage" "UNTERN" "image"
gen_asset "public/images/featured/untern/analytics.webp" "Candidate Application analytics" "Recruiter dashboard statistic charts" "UNTERN" "image"
gen_asset "public/images/featured/untern/workflow.webp" "Candidate Hiring pipeline" "Kanban board interview updates" "UNTERN" "image"

# Generate Evidence Images
gen_asset "public/images/evidence/esp32-node.webp" "ESP32 Sensor Core Node" "Microcontroller macro layout design" "EVIDENCE" "image"
gen_asset "public/images/evidence/drone-field.webp" "UAV Autonomous Hover Test" "Drone flight localization verification" "EVIDENCE" "image"
gen_asset "public/images/evidence/yolo.webp" "YOLOv8 Real-time Inference Frame" "Live subject tracking confidence values" "EVIDENCE" "image"
gen_asset "public/images/evidence/tunnel.webp" "Cloudflared Egress Config" "Secure routing rules panel view" "EVIDENCE" "image"
gen_asset "public/images/evidence/storage.webp" "Proxmox Cluster Storage Pool" "Storage usage and growth stats" "EVIDENCE" "image"

# Helper to generate short loop WebM videos using ffmpeg from the corresponding webp
gen_video() {
  local imgpath=$1
  local videopath=$2
  ffmpeg -y -loop 1 -i "$imgpath" -c:v libvpx-vp9 -t 1 -pix_fmt yuv420p "$videopath"
}

gen_video "public/images/featured/cctv/dashboard.webp" "public/videos/cctv-demo.webm"
gen_video "public/images/featured/drone/flight.webp" "public/videos/drone-demo.webm"
gen_video "public/images/featured/homelab/portainer.webp" "public/videos/homelab-demo.webm"
gen_video "public/images/featured/untern/home.webp" "public/videos/untern-demo.webm"

echo "Assets generated successfully!"
