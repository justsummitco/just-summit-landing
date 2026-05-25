/**
 * @jest-environment node
 */

jest.mock("@vercel/oidc", () => ({
  getVercelOidcToken: jest.fn(),
}));

import { getVercelOidcToken } from "@vercel/oidc";
import {
  createGoogleSheetsExternalAccountOptions,
  trackPresalesLead,
} from "@/lib/presales-sheets";

const mockGetVercelOidcToken = getVercelOidcToken as jest.Mock;

describe("presales Google Sheets OIDC auth", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetVercelOidcToken.mockResolvedValue("vercel-oidc-token");
    process.env = {
      ...originalEnv,
      GOOGLE_SHEETS_ENABLED: "true",
      GOOGLE_SHEETS_SPREADSHEET_ID: "sheet_123",
      GCP_SERVICE_ACCOUNT_EMAIL:
        "just-summit-sheets-writer@just-summit-presales.iam.gserviceaccount.com",
      GCP_WORKLOAD_IDENTITY_POOL_ID: "vercel",
      GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID: "vercel",
    };
    delete process.env.GCP_PROJECT_NUMBER;
    delete process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    delete process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test("builds the Google external account config from non-secret WIF settings", async () => {
    const options = createGoogleSheetsExternalAccountOptions({
      projectNumber: "123456789012",
      serviceAccountEmail:
        "just-summit-sheets-writer@just-summit-presales.iam.gserviceaccount.com",
      workloadIdentityPoolId: "vercel",
      workloadIdentityPoolProviderId: "vercel",
    });

    expect(options).toEqual(
      expect.objectContaining({
        type: "external_account",
        audience:
          "//iam.googleapis.com/projects/123456789012/locations/global/workloadIdentityPools/vercel/providers/vercel",
        subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
        token_url: "https://sts.googleapis.com/v1/token",
        service_account_impersonation_url:
          "https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/just-summit-sheets-writer@just-summit-presales.iam.gserviceaccount.com:generateAccessToken",
        service_account_impersonation: {
          token_lifetime_seconds: 3600,
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      })
    );

    const token = await (options as any).subject_token_supplier.getSubjectToken();

    expect(token).toBe("vercel-oidc-token");
    expect(mockGetVercelOidcToken).toHaveBeenCalledWith({
      expirationBufferMs: 300000,
    });
  });

  test("skips sheet writes until the Google project number is configured", async () => {
    const result = await trackPresalesLead({
      email: "tom@example.com",
      firstName: "Tom",
      source: "test",
    });

    expect(result).toEqual({
      ok: false,
      skipped: true,
      error: "Google Sheets is not configured",
    });
  });
});
