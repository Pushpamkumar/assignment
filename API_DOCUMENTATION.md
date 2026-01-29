# Campaign Tracker API Documentation

Complete API documentation for the Campaign Tracker System backend.

## Base URL

- **Development**: `http://localhost:8000`
- **Production**: `https://your-backend-domain.com`

## Authentication

Currently, the API uses `AllowAny` permissions. For production, implement authentication.

## Endpoints

### Campaign CRUD Operations

#### 1. List All Campaigns

**GET** `/api/campaigns/`

**Response:**
```json
[
  {
    "id": 1,
    "name": "Summer Sale 2024",
    "platform": "Google Ads",
    "budget": "5000.00",
    "status": "Active",
    "start_date": "2024-06-01",
    "end_date": "2024-08-31",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
]
```

**cURL Example:**
```bash
curl http://localhost:8000/api/campaigns/
```

---

#### 2. Get Campaign Details

**GET** `/api/campaigns/{id}/`

**Parameters:**
- `id` (path parameter) - Campaign ID

**Response:**
```json
{
  "id": 1,
  "name": "Summer Sale 2024",
  "platform": "Google Ads",
  "budget": "5000.00",
  "status": "Active",
  "start_date": "2024-06-01",
  "end_date": "2024-08-31",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

**cURL Example:**
```bash
curl http://localhost:8000/api/campaigns/1/
```

---

#### 3. Create Campaign

**POST** `/api/campaigns/`

**Request Body:**
```json
{
  "name": "Summer Sale 2024",
  "platform": "Google Ads",
  "budget": 5000.00,
  "status": "Active",
  "start_date": "2024-06-01",
  "end_date": "2024-08-31"
}
```

**Field Validation:**
- `name` (required): String, max 200 characters
- `platform` (required): One of: "Google Ads", "Meta", "LinkedIn", "Twitter", "TikTok"
- `budget` (required): Decimal number, max 12 digits, 2 decimal places
- `status` (required): One of: "Active", "Paused", "Completed"
- `start_date` (required): Date in YYYY-MM-DD format
- `end_date` (required): Date in YYYY-MM-DD format

**Response:**
```json
{
  "id": 1,
  "name": "Summer Sale 2024",
  "platform": "Google Ads",
  "budget": "5000.00",
  "status": "Active",
  "start_date": "2024-06-01",
  "end_date": "2024-08-31",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8000/api/campaigns/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Summer Sale 2024",
    "platform": "Google Ads",
    "budget": 5000.00,
    "status": "Active",
    "start_date": "2024-06-01",
    "end_date": "2024-08-31"
  }'
```

---

#### 4. Update Campaign (Full)

**PUT** `/api/campaigns/{id}/`

**Parameters:**
- `id` (path parameter) - Campaign ID

**Request Body:** (All fields required)
```json
{
  "name": "Summer Sale 2024 Updated",
  "platform": "Meta",
  "budget": 6000.00,
  "status": "Paused",
  "start_date": "2024-06-01",
  "end_date": "2024-08-31"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Summer Sale 2024 Updated",
  "platform": "Meta",
  "budget": "6000.00",
  "status": "Paused",
  "start_date": "2024-06-01",
  "end_date": "2024-08-31",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T11:00:00Z"
}
```

**cURL Example:**
```bash
curl -X PUT http://localhost:8000/api/campaigns/1/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Summer Sale 2024 Updated",
    "platform": "Meta",
    "budget": 6000.00,
    "status": "Paused",
    "start_date": "2024-06-01",
    "end_date": "2024-08-31"
  }'
```

---

#### 5. Update Campaign (Partial)

**PATCH** `/api/campaigns/{id}/`

**Parameters:**
- `id` (path parameter) - Campaign ID

**Request Body:** (Only fields to update)
```json
{
  "status": "Completed"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Summer Sale 2024",
  "platform": "Google Ads",
  "budget": "5000.00",
  "status": "Completed",
  "start_date": "2024-06-01",
  "end_date": "2024-08-31",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T11:15:00Z"
}
```

**cURL Example:**
```bash
curl -X PATCH http://localhost:8000/api/campaigns/1/ \
  -H "Content-Type: application/json" \
  -d '{"status": "Completed"}'
```

---

#### 6. Delete Campaign

**DELETE** `/api/campaigns/{id}/`

**Parameters:**
- `id` (path parameter) - Campaign ID

**Response:**
- Status Code: `204 No Content`
- Body: Empty

**cURL Example:**
```bash
curl -X DELETE http://localhost:8000/api/campaigns/1/
```

---

### Dashboard Statistics

#### Get Dashboard Stats

**GET** `/api/campaigns/stats/`

**Response:**
```json
{
  "status_counts": {
    "Active": 5,
    "Paused": 2,
    "Completed": 3
  },
  "platform_budgets": {
    "Google Ads": 15000.00,
    "Meta": 8000.00,
    "LinkedIn": 5000.00
  },
  "total_budget": 28000.00,
  "total_campaigns": 10
}
```

**Fields:**
- `status_counts`: Object with status as key and count as value
- `platform_budgets`: Object with platform as key and total budget as value
- `total_budget`: Sum of all campaign budgets
- `total_campaigns`: Total number of campaigns

**cURL Example:**
```bash
curl http://localhost:8000/api/campaigns/stats/
```

---

### Currency Conversion

#### Convert Campaign Budget

**GET** `/api/campaigns/{id}/convert_budget/`

**Parameters:**
- `id` (path parameter) - Campaign ID

**Response:**
```json
{
  "campaign_id": 1,
  "campaign_name": "Summer Sale 2024",
  "original_budget": 5000.00,
  "currency": "USD",
  "conversions": {
    "USD": 5000.00,
    "EUR": 4500.00,
    "GBP": 3900.00,
    "INR": 415000.00
  },
  "exchange_rates": {
    "EUR": 0.90,
    "GBP": 0.78,
    "INR": 83.00
  }
}
```

**Fields:**
- `campaign_id`: Campaign ID
- `campaign_name`: Campaign name
- `original_budget`: Original budget in USD
- `currency`: Base currency (USD)
- `conversions`: Budget converted to different currencies
- `exchange_rates`: Exchange rates used for conversion

**cURL Example:**
```bash
curl http://localhost:8000/api/campaigns/1/convert_budget/
```

**Error Response:**
```json
{
  "error": "Failed to fetch exchange rates: Connection timeout"
}
```

---

## Error Responses

### 400 Bad Request

```json
{
  "field_name": ["Error message"]
}
```

**Example:**
```json
{
  "budget": ["Ensure that there are no more than 12 digits in total."],
  "start_date": ["This field is required."]
}
```

### 404 Not Found

```json
{
  "detail": "Not found."
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal server error message"
}
```

---

## Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 204 | No Content - Resource deleted successfully |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

---

## Rate Limiting

Currently, no rate limiting is implemented. For production, consider adding rate limiting.

## CORS

CORS is configured to allow requests from:
- `http://localhost:3000`
- `http://127.0.0.1:3000`

For production, update `CORS_ALLOWED_ORIGINS` in `settings.py` with your frontend domain.

---

## Testing with Postman

1. Import the following collection structure:
   - **Base URL**: `http://localhost:8000`
   - **Endpoints**:
     - GET `/api/campaigns/`
     - GET `/api/campaigns/{id}/`
     - POST `/api/campaigns/`
     - PUT `/api/campaigns/{id}/`
     - PATCH `/api/campaigns/{id}/`
     - DELETE `/api/campaigns/{id}/`
     - GET `/api/campaigns/stats/`
     - GET `/api/campaigns/{id}/convert_budget/`

2. Set environment variables:
   - `base_url`: `http://localhost:8000`
   - `campaign_id`: `1` (after creating a campaign)

3. Test each endpoint sequentially.

---

## Example Workflow

1. **Create a campaign:**
   ```bash
   POST /api/campaigns/
   ```

2. **List all campaigns:**
   ```bash
   GET /api/campaigns/
   ```

3. **Get dashboard stats:**
   ```bash
   GET /api/campaigns/stats/
   ```

4. **Convert budget:**
   ```bash
   GET /api/campaigns/1/convert_budget/
   ```

5. **Update campaign:**
   ```bash
   PATCH /api/campaigns/1/
   ```

6. **Delete campaign:**
   ```bash
   DELETE /api/campaigns/1/
   ```
