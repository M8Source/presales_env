-- Drop the existing function from public schema if it exists
DROP FUNCTION IF EXISTS public.get_customers_list();

-- Create the function in m8_schema
CREATE OR REPLACE FUNCTION m8_schema.get_customers_list()
RETURNS TABLE(
  customer_id uuid,
  customer_code varchar,
  description text,
  status varchar
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    customer_id,
    customer_code,
    description,
    status
  FROM m8_schema.v_customer_node
  WHERE status = 'active'
  ORDER BY description;
END;
$function$;