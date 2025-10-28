# Open Graph Image Setup

## Required Image Specifications

### File: `og-image.jpg`
- **Location**: `/public/og-image.jpg`
- **Dimensions**: 1200 x 630 pixels (Facebook/LinkedIn recommended)
- **Format**: JPG or PNG
- **File Size**: Under 1MB for faster loading

## Design Recommendations

### Content to Include:
1. **Wedding Photo** - Use your main wedding photo or couple portrait
2. **Names** - សំណាង តាំងហ្វុង & ង៉ិន ស្រីរ៉េន (Samnang Tangfong & Ngin Sreyren)
3. **Title** - "សិរីមង្គលអាពាហ៍ពិពាហ៍" (Wedding Invitation)
4. **Date** - ថ្ងៃអាទិត្យ ទី១៦ ខែវិច្ឆិកា ឆ្នាំ២០២៥
5. **Decorative Elements** - Rose/pink colors, traditional Khmer patterns

### Design Tools:
- **Canva** (easiest): https://www.canva.com/
  - Search for "Facebook Post" or "Open Graph" template
  - Resize to 1200 x 630
- **Figma** (professional): https://www.figma.com/
- **Photoshop** (advanced)

### Quick Steps with Canva:
1. Create new design → Custom size → 1200 x 630 px
2. Add your wedding photo as background
3. Add overlay with semi-transparent rose/pink color
4. Add text:
   - Title: "សិរីមង្គលអាពាហ៍ពិពាហ៍"
   - Names: "សំណាង តាំងហ្វុង & ង៉ិន ស្រីរ៉េន"
   - Date: "16 November 2025"
5. Download as JPG
6. Save as `/public/og-image.jpg`

## Example Layout:

```
┌─────────────────────────────────────────┐
│                                         │
│     [Your Wedding Photo Background]     │
│                                         │
│   ┌───────────────────────────────┐     │
│   │                               │     │
│   │   សិរីមង្គលអាពាហ៍ពិពាហ៍        │     │
│   │                               │     │
│   │   សំណាង តាំងហ្វុង & ង៉ិន ស្រីរ៉េន │     │
│   │                               │     │
│   │   16 November 2025            │     │
│   │                               │     │
│   └───────────────────────────────┘     │
│                                         │
└─────────────────────────────────────────┘
```

## Recommended Fonts for Khmer:
- Moul (for title)
- Battambang or Hanuman (for body text)
- Available from Google Fonts

## Optional: Additional Social Media Images

### For better support across platforms:

1. **Twitter/X**: 1200 x 675 px → Save as `/public/twitter-image.jpg`
2. **Instagram Stories**: 1080 x 1920 px → Save as `/public/instagram-story.jpg`
3. **Favicon**: 512 x 512 px → Save as `/public/favicon.ico`
4. **Apple Touch Icon**: 180 x 180 px → Save as `/public/apple-touch-icon.png`

## After Creating the Image:

1. Save the image as `og-image.jpg` in the `/public` folder
2. Clear your browser cache
3. Test your links using:
   - Facebook Debugger: https://developers.facebook.com/tools/debug/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

## Current Setup

The following pages have SEO metadata configured:

✅ **Home Page** (`/`)
- Title: "Wedding Invitation - សិរីមង្គលអាពាហ៍ពិពាហ៍ | Samnang & Sreyren"
- Description: Full Khmer invitation text
- OG Image: `/og-image.jpg`

✅ **Invitation Page** (`/invitation?name=...`)
- Dynamic Title: Includes guest name when provided
- Dynamic Description: Personalized for each guest
- OG Image: `/og-image.jpg`

## Important Note:

⚠️ Don't forget to update `metadataBase` in `/app/layout.tsx` with your actual domain URL once deployed!

Current placeholder: `https://your-domain.com`
Replace with: `https://yourwedding.com` (or your actual domain)
