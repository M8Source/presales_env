-- Create RPC function to get customers list
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

-- Create RPC function to get system config
CREATE OR REPLACE FUNCTION public.get_system_config()
RETURNS TABLE(
  id bigint,
  product_levels smallint,
  location_levels smallint,
  client_levels smallint,
  system_date date,
  vendor_levels integer,
  customer_filder_displayed boolean,
  location_filter_displayed boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    sc.id,
    sc.product_levels,
    sc.location_levels,
    sc.client_levels,
    sc.system_date,
    sc.vendor_levels,
    sc.customer_filder_displayed,
    sc.location_filter_displayed
  FROM m8_schema.system_config sc
  LIMIT 1;
END;
$function$