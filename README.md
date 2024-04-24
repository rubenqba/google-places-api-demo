# Google Places API Demo

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

## Obtaining the API Key for Google Maps in NextJS

To use Google Maps services, such as the Google Maps JavaScript API or Places API, you will need a valid Google API Key. Here's how to get it:

Steps to Obtain the Google Maps API Key
1. Create a project on Google Cloud Platform (GCP):
     - Go to [Google Cloud Console](https://console.cloud.google.com/).
     - Sign in with your Google account if you haven't already.
     - Click on "Select a project" or "New Project".
     - Name your project and click "Create".
2. Enable the required APIs:
     - In the GCP navigation pane, go to "APIs & Services" > "Library".
     - Search for and enable the following APIs (you can add more as needed):
       - Google Maps JavaScript API
       - Places API (New)
3. Create an API Key:
     - Navigate to "Credentials" in the "APIs & Services" menu.
     - Click "Create credentials" and select "API Key".
     - Once the key is created, you will see a message with the new key. Copy it.
4. Restrict your API Key (optional but recommended):
     - After creating your key, you'll be prompted to restrict its usage.
     - It’s a good practice to restrict the key to the enabled APIs and the domains from which requests will be made.
5. Add the API Key to your NextJS application:
     - In your project, create a .env.local file at the root if it does not already exist.
     - Add your API Key to the file as an environment variable:

       ```env
       NEXT_PUBLIC_GOOGLE_MAPS_API_KEY='your_api_key_here'
       GOOGLE_MAPS_API_KEY='your_api_key_here'
       ```

There are two variables because its used in client and in server components, so I create both variables.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
