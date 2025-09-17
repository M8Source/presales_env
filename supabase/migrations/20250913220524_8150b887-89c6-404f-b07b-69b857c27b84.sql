CREATE OR REPLACE FUNCTION public.get_customers_list()
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
    v.customer_id,
    v.customer_code,
    v.description,
    v.status
  FROM m8_schema.v_customer_node v
  WHERE v.status = 'active'
  ORDER BY v.description;
END;
$function$